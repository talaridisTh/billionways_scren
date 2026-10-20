<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Events\TransactionApproved;
use App\Events\TransactionRejected;
use App\Http\Controllers\Controller;
use App\Models\ScanSession;
use App\Models\UserQrCode;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShopOwnerScanController extends Controller
{
    public function validateQrCode(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'qr_token' => ['required', 'string'],
            'store_id' => ['nullable', 'string'],
            'offer_id' => ['nullable', 'string'],
            'session_id' => ['required', 'string'],
        ]);

        $qrCode = UserQrCode::with('user')->firstWhere('qr_token', $validated['qr_token']);

        if (! $qrCode?->isValid()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid QR code',
            ], 422);
        }

        $session = ScanSession::find($validated['session_id']);

        if (! $session) {
            return $this->sessionNotFound();
        }

        if (! $session->user()->is($qrCode->user)) {
            return response()->json([
                'success' => false,
                'message' => 'The session does not belong to this QR code',
            ], 422);
        }

        if ($session->isExpired()) {
            return $this->sessionExpired($session);
        }

        $session->update([
            'shop_owner_id' => (string) $request->user()->id,
            'store_id' => $validated['store_id'] ?? $session->store_id,
            'offer_id' => $validated['offer_id'] ?? $session->offer_id,
            'scanned_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'user_id' => (string) $qrCode->user->id,
                'name' => $qrCode->user->name,
                'email' => $qrCode->user->email,
                'phone' => '',
                'subscription' => 'Premium',
                'is_valid' => true,
                'avatar_url' => null,
                'store_id' => $validated['store_id'] ?? '',
                'offer_id' => $validated['offer_id'] ?? '',
                'discount_percentage' => 15.0,
                'session_id' => $session->session_id,
            ],
        ]);
    }

    public function approve(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'session_id' => ['required', 'string'],
            'user_id' => ['required'],
            'store_id' => ['nullable', 'string'],
            'offer_id' => ['nullable', 'string'],
            'status' => ['sometimes', 'string'],
        ]);

        $session = $this->sessionScannedBy($request, $validated['session_id']);

        if (! $session) {
            return $this->sessionNotFound();
        }

        $refusal = $this->decisionRefusal($session, (string) $validated['user_id']);

        if ($refusal) {
            return $refusal;
        }

        $session->approve();

        event(new TransactionApproved($session));

        return response()->json([
            'success' => true,
            'data' => [
                'transaction_id' => 'tx_'.uniqid(),
                'approved' => true,
                'timestamp' => now()->toIso8601String(),
                'session_id' => $session->session_id,
                'message' => 'Transaction approved successfully',
            ],
        ]);
    }

    public function reject(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'session_id' => ['required', 'string'],
            'user_id' => ['required'],
            'offer_id' => ['nullable', 'string'],
            'status' => ['sometimes', 'string'],
        ]);

        $session = $this->sessionScannedBy($request, $validated['session_id']);

        if (! $session) {
            return $this->sessionNotFound();
        }

        $refusal = $this->decisionRefusal($session, (string) $validated['user_id']);

        if ($refusal) {
            return $refusal;
        }

        $session->reject();

        event(new TransactionRejected($session));

        return response()->json([
            'success' => true,
            'message' => 'Transaction rejected',
        ]);
    }

    public function createUserSession(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'session_id' => ['required', 'string', 'max:255', 'unique:scan_sessions,session_id'],
            'status' => ['sometimes', 'string', 'in:pending'],
        ]);

        $session = ScanSession::create([
            'session_id' => $validated['session_id'],
            'user_id' => $request->user()->id,
            'status' => 'pending',
            'expires_at' => now()->addMinutes(5),
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'session_id' => $session->session_id,
                'user_id' => $session->user_id,
                'status' => $session->status,
                'created_at' => $session->created_at->toIso8601String(),
                'expires_at' => $session->expires_at->toIso8601String(),
            ],
        ], 201);
    }

    public function checkSessionStatus(Request $request, string $sessionId): JsonResponse
    {
        $session = $this->sessionVisibleTo($request, $sessionId);

        if (! $session) {
            return response()->json([
                'success' => false,
                'message' => 'Session not found',
                'data' => [
                    'status' => 'expired',
                ],
            ], 404);
        }

        if ($session->isExpired()) {
            return $this->sessionExpired($session);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'session_id' => $session->session_id,
                'status' => $session->status,
                'approved_at' => $session->approved_at?->toIso8601String(),
            ],
        ]);
    }

    public function updateSessionStatus(Request $request, string $sessionId): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,approved,rejected,completed'],
        ]);

        $session = $this->sessionVisibleTo($request, $sessionId);

        if (! $session) {
            return $this->sessionNotFound();
        }

        if ($session->isExpired()) {
            return $this->sessionExpired($session);
        }

        $isDecision = in_array($validated['status'], ['approved', 'rejected'], true);

        if ($isDecision) {
            if ($session->shop_owner_id !== (string) $request->user()->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Only the shop owner who scanned the code can approve or reject it',
                ], 403);
            }
        }

        match ($validated['status']) {
            'approved' => $session->approve(),
            'rejected' => $session->reject(),
            'completed' => $session->complete(),
            'pending' => $session->update(['status' => 'pending']),
        };

        if ($validated['status'] === 'approved') {
            event(new TransactionApproved($session));
        }

        if ($validated['status'] === 'rejected') {
            event(new TransactionRejected($session));
        }

        return response()->json([
            'success' => true,
            'message' => 'Session status updated',
            'data' => [
                'session_id' => $session->session_id,
                'status' => $session->status,
            ],
        ]);
    }

    private function sessionScannedBy(Request $request, string $sessionId): ?ScanSession
    {
        return ScanSession::query()
            ->where('session_id', $sessionId)
            ->where('shop_owner_id', (string) $request->user()->id)
            ->first();
    }

    private function sessionVisibleTo(Request $request, string $sessionId): ?ScanSession
    {
        $userId = $request->user()->id;

        return ScanSession::query()
            ->where('session_id', $sessionId)
            ->where(fn (Builder $query) => $query
                ->where('user_id', $userId)
                ->orWhere('shop_owner_id', (string) $userId))
            ->first();
    }

    private function decisionRefusal(ScanSession $session, string $userId): ?JsonResponse
    {
        if ((string) $session->user_id !== $userId) {
            return response()->json([
                'success' => false,
                'message' => 'The session belongs to another user',
            ], 422);
        }

        if ($session->isExpired()) {
            return $this->sessionExpired($session);
        }

        if (! $session->isPending()) {
            return response()->json([
                'success' => false,
                'message' => "The session is already {$session->status}",
            ], 409);
        }

        return null;
    }

    private function sessionNotFound(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'Session not found',
        ], 404);
    }

    private function sessionExpired(ScanSession $session): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'Session has expired',
            'data' => [
                'status' => 'expired',
                'session_id' => $session->session_id,
            ],
        ], 410);
    }
}
