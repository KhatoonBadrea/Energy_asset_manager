<?php

namespace App\Policies\Project;

use App\Models\Project;
use App\Models\User;

/**
 * Governs who is allowed to view, update, or delete a given project.
 * Every rule here boils down to a single check: is this user the project's owner?
 */
class ProjectPolicy
{
    /**
     * Determine whether the user can view the given project's details.
     */
    public function view(User $user, Project $project): bool
    {
        return $user->id === $project->user_id;
    }

    /**
     * Determine whether the user can update the given project.
     */
    public function update(User $user, Project $project): bool
    {
        return $user->id === $project->user_id;
    }

    /**
     * Determine whether the user can delete the given project.
     */
    public function delete(User $user, Project $project): bool
    {
        return $user->id === $project->user_id;
    }
}
