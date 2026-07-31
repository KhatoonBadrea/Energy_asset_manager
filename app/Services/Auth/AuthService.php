<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Support\ServiceResult;
use Illuminate\Support\Facades\Hash;

/**
 * Handles all authentication business logic: registration, login, and logout.
 * Controllers stay thin and only translate ServiceResult objects into HTTP responses.
 */
class AuthService
{
    /**
     * Register a new user account and immediately issue an API access token,
     * so the frontend can log the user in without a second request.
     *
     * @param array{name: string, email: string, password: string} $data Validated registration data.
     */
    public function register(array $data): ServiceResult
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            // The 'password' => 'hashed' cast on the User model hashes this automatically.
            'password' => $data['password'],
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return ServiceResult::success(
            data: ['user' => $user, 'token' => $token],
            message: 'Account created successfully.',
            status: 201,
        );
    }

    /**
     * Attempt to authenticate a user using email and password.
     * Returns a failure result with 401 status if credentials do not match.
     *
     * @param array{email: string, password: string} $credentials Validated login credentials.
     */
    public function login(array $credentials): ServiceResult
    {
        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return ServiceResult::failure(
                message: 'The provided credentials are incorrect.',
                status: 401,
            );
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return ServiceResult::success(
            data: ['user' => $user, 'token' => $token],
            message: 'Logged in successfully.',
        );
    }

    /**
     * Revoke the token used to make the current request, effectively logging the user out
     * of this device/session only (other active tokens remain valid).
     */
    public function logout(User $user): ServiceResult
    {
        $user->currentAccessToken()->delete();

        return ServiceResult::success(message: 'Logged out successfully.');
    }
}