<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/presentation', function () {
    return Inertia::render('presentation');
})->name('presentation');

Route::get('/xronia-polla-maria', function () {
    return Inertia::render('millionaire/millionaire');
})->name('xronia-polla-maria');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
