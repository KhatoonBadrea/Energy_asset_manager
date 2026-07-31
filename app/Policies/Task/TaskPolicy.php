<?php

namespace App\Policies\Task;

use App\Models\Task;
use App\Models\User;

/**
 * Governs who is allowed to view, update, or delete a given task.
 *
 * Tasks have no direct user_id column - ownership is inherited through the
 * parent project, so every check goes through the task's project relation.
 */
class TaskPolicy
{
    /**
     * Determine whether the user can view the given task.
     */
    public function view(User $user, Task $task): bool
    {
        return $user->id === $task->project->user_id;
    }

    /**
     * Determine whether the user can update the given task.
     */
    public function update(User $user, Task $task): bool
    {
        return $user->id === $task->project->user_id;
    }

    /**
     * Determine whether the user can delete the given task.
     */
    public function delete(User $user, Task $task): bool
    {
        return $user->id === $task->project->user_id;
    }
}
