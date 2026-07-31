<?php

namespace App\Http\Resources\Task;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the task into an array.
     * Both the raw enum value ("in_progress") and a human-readable label
     * ("In progress") are returned, so the frontend never has to translate it itself.
     */
    public function toArray(Request $request): array
    {
        return [
            'project_name' => $this->project->name,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status->value,
            'status_label' => $this->status->label(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
