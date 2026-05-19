<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Kreait\Firebase\Factory;

class FirebaseAuthController extends Controller
{
    // Valida el token Firebase y crea/actualiza el usuario en la BD
    public function authenticate(Request $request)
    {
        $request->validate(['token' => 'required|string']);

        try {
            // Inicializar Firebase con las credenciales del servidor
            $factory = (new Factory)->withServiceAccount(base_path(env('FIREBASE_CREDENTIALS')));
            $auth = $factory->createAuth();

            // Verificar el token JWT enviado desde el frontend
            $verifiedToken = $auth->verifyIdToken($request->token);
            $uid = $verifiedToken->claims()->get('sub');
            $email = $verifiedToken->claims()->get('email');
            $name = $verifiedToken->claims()->get('name') ?? 'Usuario_' . rand(100, 999);

            // Crear o actualizar el usuario en la base de datos local
            $user = User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'firebase_uid' => $uid,
                    'password' => bcrypt(str()->random(32)),
                ]
            );

            // Iniciar sesión en Laravel
            Auth::login($user);
            $request->session()->regenerate();

            return response()->json(['ok' => true]);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
    }
}
