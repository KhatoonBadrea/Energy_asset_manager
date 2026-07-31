<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Anyone can attempt to log in - no prior authentication is required.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules for login. Intentionally loose (no "exists:users" rule)
     * so we never leak which emails are registered through a validation error.
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }
}
