<?php

namespace App\Services\Task;

use App\Models\Project;
use App\Models\Task;
use App\Support\ServiceResult;

/**
 * Encapsulates all business logic for managing tasks within a project.
 * Every method here expects the caller (controller) to have already verified
 * ownership through a policy - this service only handles data operations.
 */
class TaskService
{
    /**
     * Return every task that belongs to the given project.
     */
    public function listForProject(Project $project): ServiceResult
    {
        $tasks = $project->tasks()->latest()->get();

        return ServiceResult::success(data: $tasks);
    }

    /**
     * Create a new task under the given project.
     *
     * @param array{title: string, description?: string, status?: string} $data Validated task data.
     */
    public function create(Project $project, array $data): ServiceResult
    {
        $task = $project->tasks()->create($data);

        return ServiceResult::success(
            data: $task,
            message: 'Task created successfully.',
            status: 201,
        );
    }

    /**
     * Update an existing task with the given validated fields (e.g. changing its status).
     *
     * @param array{title?: string, description?: string, status?: string} $data
     */
    public function update(Task $task, array $data): ServiceResult
    {
        $task->update($data);

        return ServiceResult::success(
            data: $task->fresh(),
            message: 'Task updated successfully.',
        );
    }

    /**
     * Permanently delete a task.
     */
    public function delete(Task $task): ServiceResult
    {
        $task->delete();

        return ServiceResult::success(message: 'Task deleted successfully.');
    }
}
