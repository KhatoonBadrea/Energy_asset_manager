<?php

namespace App\Http\Requests\Task;


use App\Enums\TaskStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreTaskRequest extends FormRequest
{
    /**
     * Project ownership is verified separately in the controller via TaskPolicy.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules for creating a new task.
     * The Enum rule rejects any status value that is not a valid TaskStatus case.
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['sometimes', new Enum(TaskStatus::class)],
        ];
    }
}
