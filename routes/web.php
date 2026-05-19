<?php

use App\Http\Controllers\Auth\FirebaseAuthController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\GuestAuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Ruta raíz: muestra el login con Firebase (sin COOP para permitir el popup de Google)
Route::get('/', function () {
    return Inertia::render('Auth/FirebaseLogin');
})->middleware(\App\Http\Middleware\RemoveCrossOriginOpenerPolicy::class);

// Endpoint para validar token Firebase y crear sesión Laravel
Route::post('/auth/firebase', [FirebaseAuthController::class, 'authenticate']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/chat', function () {
    return Inertia::render('Chat');
})->middleware([\App\Http\Middleware\EnsureChatAccess::class])->name('chat');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/auth/google',            [GoogleAuthController::class, 'redirect'])->name('auth.google');
Route::get('/auth/google/callback',   [GoogleAuthController::class, 'callback'])->name('auth.google.callback');
Route::post('/auth/guest',            [GuestAuthController::class, 'login'])->name('auth.guest');
Route::post('/auth/guest/logout',     [GuestAuthController::class, 'logout'])->name('auth.guest.logout');

require __DIR__.'/auth.php';
