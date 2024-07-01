<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Dmitrii',
            'email' => 'test@test.ru',
            'password' => bcrypt('11112222'),
        ]);

        Project::factory()->count(5)->hasTasks(5)->create();
    }
}
