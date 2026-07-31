<?php

namespace App\Services\Project;

use App\Models\Project;
use App\Models\User;
use App\Support\ServiceResult;

/**
 * Encapsulates all business logic for managing a user's projects.
 * Ownership scoping (a user only ever sees their own projects) happens here,
 * not in the controller, so it can never be forgotten on a new endpoint.
 */
class ProjectService
{
    /**
     * Return every project owned by the given user, including a lightweight task count
     * (not the full task list) so the index endpoint stays fast.
     */
    public function listForUser(User $user): ServiceResult
    {
        $projects = $user->projects()
            ->withCount('tasks')
            ->latest()
            ->get();

        return ServiceResult::success(data: $projects);
    }

    /**
     * Create a new project and attach it to the given user automatically.
     *
     * @param array{name: string, description?: string} $data Validated project data.
     */
    public function create(User $user, array $data): ServiceResult
    {
        $project = $user->projects()->create($data);

        return ServiceResult::success(
            data: $project,
            message: 'Project created successfully.',
            status: 201,
        );
    }

    /**
     * Return a single project together with its tasks, for the project details page.
     */
    public function show(Project $project): ServiceResult
    {
        $project->load('tasks');

        return ServiceResult::success(data: $project);
    }

    /**
     * Update an existing project with the given validated fields.
     *
     * @param array{name?: string, description?: string} $data
     */
    public function update(Project $project, array $data): ServiceResult
    {
        $project->update($data);

        return ServiceResult::success(
            data: $project->fresh(),
            message: 'Project updated successfully.',
        );
    }

    /**
     * Delete a project. Its tasks are removed automatically by the
     * cascadeOnDelete() foreign key defined on the tasks migration.
     */
    public function delete(Project $project): ServiceResult
    {
        $project->delete();

        return ServiceResult::success(message: 'Project deleted successfully.');
    }
}