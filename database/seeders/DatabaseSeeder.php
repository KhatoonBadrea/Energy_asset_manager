<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Demo user',
            'email' => 'demo@apollo-gs.com',
        ]);
 
        Project::factory()
            ->count(3)
            ->for($user)
            ->has(Task::factory()->count(5))
            ->create();
    }
}
