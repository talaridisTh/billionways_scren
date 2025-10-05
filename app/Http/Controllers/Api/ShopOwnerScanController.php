<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Events\TransactionApproved;
use App\Events\TransactionRejected;
use App\Http\Controllers\Controller;
use App\Models\ScanSession;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ShopOwnerScanController extends Controller
{
    public function validateQrCode(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'qr_token' => 'required|string',
            'store_id' => 'nullable|string',
            'offer_id' => 'nullable|string',
            'session_id' => 'required|string',
        ]);

        $user = User::inRandomOrder()->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'No users available',
            ], 404);
        }


        $session = ScanSession::where('session_id', $validated['session_id'])->first();

        if (!$session) {
            return response()->json([
                'success' => false,
                'message' => 'Session not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'user_id' => (string) $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => '',
                'subscription' => 'Premium',
                'is_valid' => true,
                'avatar_url' => null,
                'store_id' => $validated['store_id'] ?? '',
                'offer_id' => $validated['offer_id'] ?? '',
                'discount_percentage' => 15.0,
                'session_id' => $validated['session_id'],
            ],
        ]);
    }

    public function approve(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'session_id' => 'required|string',
            'user_id' => 'required',
            'store_id' => 'nullable|string',
            'offer_id' => 'nullable|string',
            'status' => 'sometimes|string',
        ]);

        $session = ScanSession::where('session_id', $validated['session_id'])->first();

        if (!$session) {
            return response()->json([
                'success' => false,
                'message' => 'Session not found',
            ], 404);
        }

        $session->approve();
        event(new TransactionApproved($session));

        return response()->json([
            'success' => true,
            'data' => [
                'transaction_id' => 'tx_' . uniqid(),
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
            'session_id' => 'required|string',
            'user_id' => 'required',
            'offer_id' => 'nullable|string',
            'status' => 'sometimes|string',
        ]);

        $session = ScanSession::where('session_id', $validated['session_id'])->first();

        if (!$session) {
            return response()->json([
                'success' => false,
                'message' => 'Session not found',
            ], 404);
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
            'user_id' => 'required',
            'session_id' => 'required|string',
            'status' => 'sometimes|string|in:pending',
        ]);

        $session = ScanSession::create([
            'session_id' => $validated['session_id'],
            'user_id' => User::inRandomOrder()->first()->id,
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

    public function checkSessionStatus(string $sessionId): JsonResponse
    {

        $session = ScanSession::where('session_id', $sessionId)->first();
        ray($session);

        if (!$session) {
            return response()->json([
                'success' => false,
                'message' => 'Session not found',
                'data' => [
                    'status' => 'expired',
                ],
            ], 404);
        }

        if ($session->isExpired()) {
            $session->update(['status' => 'expired']);

            return response()->json([
                'success' => false,
                'message' => 'Session has expired',
                'data' => [
                    'status' => 'expired',
                    'session_id' => $session->session_id,
                ],
            ], 410);
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
        ray($request->all());
        $validated = $request->validate([
            'status' => 'required|string|in:pending,approved,rejected,completed',
        ]);

        $session = ScanSession::where('session_id', $sessionId)->first();

        if (!$session) {
            return response()->json([
                'success' => false,
                'message' => 'Session not found',
            ], 404);
        }

        $session->update(['status' => $validated['status']]);

        if ($validated['status'] === 'approved') {
            $session->approve();
            event(new TransactionApproved($session));
        } elseif ($validated['status'] === 'rejected') {
            $session->reject();
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
}
