<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureChatAccess
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() || session('guest_name')) {
            return $next($request);
        }

        return redirect('/');
    }
}
