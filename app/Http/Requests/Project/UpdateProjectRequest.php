<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Ownership is verified separately in the controller via ProjectPolicy;
     * this request only validates the shape of the input.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules for updating a project. Fields are optional ("sometimes")
     * since this supports partial updates via PATCH.
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ];
    }
}
