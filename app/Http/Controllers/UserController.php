<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\States\Active as Active;
use App\States\Banned as Banned;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        if (request('name')) {
            $query->where('name', 'like', '%'.request('name').'%');
        }

        if (request('email')) {
            $query->where('email', request('email'));
        }

        $users = $query->paginate(10);

        // Возврат данных через Inertia.js
        return inertia('User/Index', [
            // Коллекция проектов, отформатированных с помощью UserResource
            'users' => UserResource::collection($users),
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
        return inertia('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        $user = User::create($data);
        // dd($user);

        return to_route('user.index')->with('success', 'Создан новый пользователь!');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // return inertia('User/Show', [
        //     'user' => new UserResource($user)
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;

        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public');
        }

        $user->update($data);

        return to_route('user.index')->with('success', "Данные пользователя \"{$user->name}\" успешно обновлены!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $nameOfDeletedUser = $user->name;

        $user->delete();

        return to_route('user.index')->with('success', "Пользователь \"{$nameOfDeletedUser}\" был успешно удален!");
    }

    public function toBanned(User $user)
    {
        if (! $user->state->equals(Banned::class)) {
            $user->state->transitionTo(Banned::class);
            $user->save();
        }

        $nameOfChangedStateUser = $user->name;
        $stateOfChangedStateUser = $user->state;

        return to_route('user.index')->with('success', "У \"{$nameOfChangedStateUser}\" сменился статус на \"{$stateOfChangedStateUser}\"!");
    }

    public function toActive(User $user)
    {
        if (! $user->state->equals(Active::class)) {
            $user->state->transitionTo(Active::class);
            $user->save();
        }

        $nameOfChangedStateUser = $user->name;
        $stateOfChangedStateUser = $user->state->label();

        return to_route('user.index')->with('success', "У \"{$nameOfChangedStateUser}\" сменился статус на \"{$stateOfChangedStateUser}\"!");
    }
}
