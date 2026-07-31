<?php

namespace App\Http\Requests\Task;

use App\Enums\TaskStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Ownership is verified separately in the controller via TaskPolicy.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules for updating a task, most commonly used to change its status
     * (e.g. dragging a task card from "todo" to "done" on the frontend board).
     */
    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['sometimes', new Enum(TaskStatus::class)],
        ];
    }
}
