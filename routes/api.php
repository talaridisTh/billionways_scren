<?php

declare(strict_types=1);

use App\Http\Controllers\Api\AppSignupController;
use App\Http\Controllers\Api\ShopOwnerScanController;
use Illuminate\Support\Facades\Route;

Route::post('/app-signups', [AppSignupController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('shop-owner/scan')->middleware('can:scanQrCodes')->group(function () {
        Route::post('/validate', [ShopOwnerScanController::class, 'validateQrCode']);
        Route::post('/approve', [ShopOwnerScanController::class, 'approve']);
        Route::post('/reject', [ShopOwnerScanController::class, 'reject']);
    });

    Route::post('/user/scan-session', [ShopOwnerScanController::class, 'createUserSession']);
    Route::get('/user/scan-session/{sessionId}/status', [ShopOwnerScanController::class, 'checkSessionStatus']);
    Route::put('/user/scan-session/{sessionId}', [ShopOwnerScanController::class, 'updateSessionStatus']);
});
