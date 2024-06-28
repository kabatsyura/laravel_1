<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Создание базового запроса для модели Project
        $query = Task::query();

        // Фильтр: Проверка наличия параметра 'name' в запросе
        if (request('name')) {
            // Если параметр 'name' существует, добавляем условие фильтрации по имени
            $query->where('name', 'like', '%'.request('name').'%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }
        // Выполнение запроса с пагинацией на 10 записей на страницу
        $tasks = $query->paginate(10);

        // Возврат данных через Inertia.js
        return inertia('Task/Index', [
            // Коллекция проектов, отформатированных с помощью ProjectResource
            'tasks' => TaskResource::collection($tasks),
            // Возврат значения фильтра. Параметры запроса для сохранения состояния фильтрации
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
