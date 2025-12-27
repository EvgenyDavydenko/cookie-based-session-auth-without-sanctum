<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle user login for SPA application.
     * Uses session-based authentication via cookies.
     * CSRF protection must be initialized from frontend first.
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (! Auth::attempt($credentials)) {
            return $this->apiError(
                'Invalid credentials.',
                Response::HTTP_UNAUTHORIZED
            );
        }

        $request->session()->regenerate();

        $user = $request->user();

        return $this->apiSuccess([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    /**
     * Revoke the current access token.
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Clear the session cookie
        $response = $this->apiSuccess([
            'logout' => true,
        ]);

        // Force the session cookie to be cleared
        return $response->withCookie(cookie()->forget(config('session.cookie')));
    }

    /**
     * Return the authenticated user.
     */
    public function me(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return $this->apiError('Unauthenticated.', Response::HTTP_UNAUTHORIZED);
        }

        return $this->apiSuccess([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }
}