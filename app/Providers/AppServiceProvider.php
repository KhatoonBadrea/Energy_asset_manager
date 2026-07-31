<?php

namespace App\Providers;

use App\Models\Project;
use App\Models\Task;
use App\Policies\Project\ProjectPolicy;
use App\Policies\Task\TaskPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(Project::class, ProjectPolicy::class);
        Gate::policy(Task::class, TaskPolicy::class);
        // dd(Gate::getPolicyFor(Project::class));
    }
}
