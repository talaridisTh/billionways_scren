<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AppSignup;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AppSignupController extends Controller
{
    public function store(Request $request)
    {
        Log::info($request->all());
        $data = $request->validate([
            'identifier' => ['required', 'string', 'max:255'],
            'method' => ['required', 'string', 'in:email,phone'],
            'platform' => ['nullable', 'string', 'max:64'],
            'ts' => ['nullable', 'string'],
        ]);

        $timestamp = null;

        if (!empty($data['ts'])) {
            try {
                $timestamp = Carbon::parse($data['ts']);
            } catch (\Throwable $e) {
                return response()->json([
                    'message' => 'Invalid timestamp format',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        }

        $signup = AppSignup::create([
            'identifier' => $data['identifier'],
            'method' => $data['method'],
            'platform' => $data['platform'] ?? null,
            'ts' => $timestamp,
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return response()->json([
            'id' => $signup->id,
            'ok' => true,
        ]);
    }
}
