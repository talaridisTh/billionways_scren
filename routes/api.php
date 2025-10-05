<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AppSignupController;
use App\Http\Controllers\Api\ShopOwnerScanController;

Route::post('/app-signups', [AppSignupController::class, 'store']);

Route::prefix('shop-owner/scan')->group(function () {
    Route::post('/validate', [ShopOwnerScanController::class, 'validateQrCode']);
    Route::post('/approve', [ShopOwnerScanController::class, 'approve']);
    Route::post('/reject', [ShopOwnerScanController::class, 'reject']);
});

Route::post('/user/scan-session', [ShopOwnerScanController::class, 'createUserSession']);
Route::get('/user/scan-session/{sessionId}/status', [ShopOwnerScanController::class, 'checkSessionStatus']);
Route::put('/user/scan-session/{sessionId}', [ShopOwnerScanController::class, 'updateSessionStatus']);
