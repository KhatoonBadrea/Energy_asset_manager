<?php

namespace App\Http\Controllers\Api\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Resources\Task\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Services\Task\TaskService;
use Illuminate\Http\JsonResponse;

/**
 * Exposes full CRUD over tasks, always nested under their parent project
 * (routes look like /api/projects/{project}/tasks/{task}).
 *
 * Laravel automatically scopes the {task} binding to its parent {project} here,
 * because Task defines a project() relation matching the parent route segment -
 * so a task id that belongs to a different project already 404s before this code runs.
 */

class TaskController extends Controller
{
    public function __construct(private readonly TaskService $taskService) {}

    /**
     * GET /api/projects/{project}/tasks
     * List every task that belongs to the given project.
     */
    public function index(Project $project): JsonResponse
    {
        $this->authorize('view', $project);

        $result = $this->taskService->listForProject($project);

        return response()->json(['data' => TaskResource::collection($result->data)], $result->status);
    }

    /**
     * POST /api/projects/{project}/tasks
     * Create a new task under the given project.
     */
    public function store(StoreTaskRequest $request, Project $project): JsonResponse
    {
        $this->authorize('update', $project);

        $result = $this->taskService->create($project, $request->validated());

        return response()->json([
            'message' => $result->message,
            'data' => new TaskResource($result->data),
        ], $result->status);
    }

    /**
     * PUT/PATCH /api/projects/{project}/tasks/{task}
     * Update an existing task (title, description, or status).
     */
    public function update(UpdateTaskRequest $request, Project $project, Task $task): JsonResponse
    {
        $this->authorize('update', $task);

        $result = $this->taskService->update($task, $request->validated());

        return response()->json([
            'message' => $result->message,
            'data' => new TaskResource($result->data),
        ], $result->status);
    }

    /**
     * DELETE /api/projects/{project}/tasks/{task}
     * Permanently delete a task.
     */
    public function destroy(Project $project, Task $task): JsonResponse
    {
        $this->authorize('delete', $task);

        $result = $this->taskService->delete($task);

        return response()->json(['message' => $result->message], $result->status);
    }
}
