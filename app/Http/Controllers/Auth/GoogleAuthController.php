<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Throwable $e) {
            return redirect('/')->withErrors(['google' => 'Error al autenticar con Google.']);
        }

        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name'     => $googleUser->getName() ?? 'Usuario_' . rand(100, 999),
                'password' => null,
            ]
        );

        $user->google_id = $googleUser->getId();
        $user->save();

        Auth::login($user);
        request()->session()->regenerate();

        return redirect()->intended('/chat');
    }
}
