<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Project\ProjectController;
use App\Http\Controllers\Api\Task\TaskController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public routes - no authentication required
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected routes - require a valid Sanctum bearer token
|--------------------------------------------------------------------------
*/
Route::apiResource('projects', ProjectController::class)->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Full CRUD: GET/POST /projects, GET/PUT/PATCH/DELETE /projects/{project}

    // Nested CRUD: tasks always exist inside a project.
    // "show" is intentionally excluded - the frontend always loads a task
    // as part of its parent project's task list, never in isolation.
    Route::apiResource('projects.tasks', TaskController::class)
        ->except(['show']);
});
