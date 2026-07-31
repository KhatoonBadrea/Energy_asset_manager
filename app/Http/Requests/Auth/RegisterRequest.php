<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{

    /**
     * Anyone can attempt to register - no prior authentication is required.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules for creating a new user account.
     * The email must be unique and the password must be confirmed
     * (i.e. the frontend must send a matching password_confirmation field).
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}
