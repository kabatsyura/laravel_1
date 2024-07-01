<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected $projects;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->projects = Project::factory()
            ->count(3)
            ->hasTasks(3)
            ->create([
                'created_by' => $this->user->id,
                'updated_by' => $this->user->id,
            ]);

        $this->actingAs($this->user);
    }

    protected function tearDown(): void
    {
        foreach ($this->projects as $project) {
            $project->tasks()->delete();
            $project->delete();
        }

        $this->user->delete();

        parent::tearDown();
    }

    #[Test]
    public function projectModelExists(): void
    {
        foreach ($this->projects as $project) {
            $this->assertModelExists($project);
        }
    }

    #[Test]
    public function projectRouteStatus(): void
    {
        $response = $this->get(route('project.index'));
        $response->assertStatus(200);

        foreach ($this->projects as $project) {
            $response->assertSee($project->name);
        }
    }

    #[Test]
    public function projectDatabaseCount(): void
    {
        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseCount('projects', 3);
        $this->assertDatabaseCount('tasks', 9);
    }

    #[Test]
    public function projectDatabaseHas(): void
    {
        Project::factory()
            ->create([
                'name' => 'Проект 1',
                'description' => 'Привет, Мир!',
                'due_date' => now(),
                'status' => 'Отменен',
                'image_path' => 'https://храним-картинки.рф',
                'created_by' => $this->user->id,
                'updated_by' => $this->user->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

        $this->assertDatabaseHas('projects', [
            'name' => 'Проект 1',
            'description' => 'Привет, Мир!',
            'status' => 'Отменен',
            'image_path' => 'https://храним-картинки.рф',
        ]);
    }

    #[Test]
    public function projectDelete(): void
    {
        foreach ($this->projects as $project) {
            $project->tasks()->delete();
            $project->delete();
            $this->assertSoftDeleted($project);
        }
    }
}
