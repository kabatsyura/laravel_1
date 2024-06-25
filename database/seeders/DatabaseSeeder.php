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
            'email' => 'dmitriy.kabatsyura@gmail.com',
            'password' => bcrypt('Italianez90!'),
        ]);

        Project::factory()->count(5)->hasTasks(5)->create();
    }
}
