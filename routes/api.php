<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AppSignupController;

Route::post('/app-signups', [AppSignupController::class, 'store']);
