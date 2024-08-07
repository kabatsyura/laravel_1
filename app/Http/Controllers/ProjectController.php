<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Создание базового запроса для модели Project
        $query = Project::query();

        // Фильтр: Проверка наличия параметра 'name' в запросе
        if (request('name')) {
            // Если параметр 'name' существует, добавляем условие фильтрации по имени
            $query->where('name', 'like', '%'.request('name').'%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }
        // Выполнение запроса с пагинацией на 10 записей на страницу
        $projects = $query->paginate(10);

        // Возврат данных через Inertia.js
        return inertia('Project/Index', [
            // Коллекция проектов, отформатированных с помощью ProjectResource
            'projects' => ProjectResource::collection($projects),
            // Возврат значения фильтра. Параметры запроса для сохранения состояния фильтрации
            'queryParams' => request()->query() ?: null,
            // после успешного создания проекта из метода store()
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $image = $data['image_path'] ?? null;

        if ($image) {
            $data['image_path'] = $image->store('project/'.Str::random(), 'public');
        }

        // в случаях, когда создаешь данные, но их нет в форме
        // тогда в методе вызываем необходимые функции
        // сохраняем и используем в дальнейшем
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        Project::create($data);

        return to_route('project.index')->with('success', 'Проект был создан!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $project->update($data);

        return to_route('project.index')->with('success', "Проект \"{$project->name}\" был успешно обновлен!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $nameOfDeletedProject = $project->name;

        $project->tasks()->delete();
        $project->delete();

        return to_route('project.index')->with('success', "Проект \"{$nameOfDeletedProject}\" был успешно удален!");
    }
}
