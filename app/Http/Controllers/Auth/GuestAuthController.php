<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GuestAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate(['name' => 'required|string|max:30']);

        session(['guest_name' => trim($request->name)]);

        return redirect('/chat');
    }

    public function logout()
    {
        session()->forget('guest_name');
        return redirect('/');
    }
}
