<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Any authenticated user may create a project; ownership is assigned
     * automatically from the authenticated user, not from client input.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules for creating a new project.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ];
    }
}
