<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\Auth\UserResource;
use App\Services\Auth\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Handles the three authentication endpoints exposed to the frontend.
 * All business logic lives in AuthService - this controller only
 * translates HTTP requests into service calls and ServiceResult into JSON.
 */
class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService) {}

    /**
     * POST /api/register
     * Register a new user and return the user data plus an access token.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $result = $this->authService->register($request->validated());

        return response()->json([
            'message' => $result->message,
            'user' => new UserResource($result->data['user']),
            'token' => $result->data['token'],
        ], $result->status);
    }

    /**
     * POST /api/login
     * Authenticate an existing user and return the user data plus a fresh access token.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->validated());

        if (! $result->success) {
            return response()->json(['message' => $result->message], $result->status);
        }

        return response()->json([
            'message' => $result->message,
            'user' => new UserResource($result->data['user']),
            'token' => $result->data['token'],
        ], $result->status);
    }

    /**
     * POST /api/logout
     * Revoke the token used for the current request.
     */
    public function logout(Request $request): JsonResponse
    {
        $result = $this->authService->logout($request->user());

        return response()->json(['message' => $result->message], $result->status);
    }
}
