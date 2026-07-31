<?php

namespace App\Http\Controllers\Api\Project;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\Project\ProjectResource;
use App\Models\Project;
use App\Services\Project\ProjectService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Exposes full CRUD over a user's projects.
 * Route model binding automatically resolves {project} into an Eloquent model
 * before the method runs, and 404s automatically if the id does not exist.
 */
class ProjectController extends Controller
{
    public function __construct(private readonly ProjectService $projectService) {}

    /**
     * GET /api/projects
     * List every project owned by the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        $result = $this->projectService->listForUser($request->user());

        return response()->json([
            'data' => ProjectResource::collection($result->data),
        ], $result->status);
    }

    /**
     * POST /api/projects
     * Create a new project for the authenticated user.
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        // dd($request->user());
        $result = $this->projectService->create($request->user(), $request->validated());

        return response()->json([
            'message' => $result->message,
            'data' => new ProjectResource($result->data),
        ], $result->status);
    }

    /**
     * GET /api/projects/{project}
     * Show a single project with its tasks.
     * authorize() throws a 403 automatically if the project belongs to another user.
     */
    public function show(Request $request, Project $project): JsonResponse
    {

        $this->authorize('view', $project);

        $result = $this->projectService->show($project);

        return response()->json(['data' => new ProjectResource($result->data)], $result->status);
    }

    /**
     * PUT/PATCH /api/projects/{project}
     * Update an existing project owned by the authenticated user.
     */
    public function update(UpdateProjectRequest $request, Project $project): JsonResponse
    {
        $this->authorize('update', $project);

        $result = $this->projectService->update($project, $request->validated());

        return response()->json([
            'message' => $result->message,
            'data' => new ProjectResource($result->data),
        ], $result->status);
    }

    /**
     * DELETE /api/projects/{project}
     * Delete a project owned by the authenticated user (cascades to its tasks).
     */
    public function destroy(Request $request, Project $project): JsonResponse
    {
        $this->authorize('delete', $project);

        $result = $this->projectService->delete($project);

        return response()->json(['message' => $result->message], $result->status);
    }
}
