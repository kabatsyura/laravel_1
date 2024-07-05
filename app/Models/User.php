<?php

namespace App\Models;

use App\States\UserState;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\ModelStates\HasStates;

class User extends Authenticatable
{
    use HasFactory, HasStates, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'image',
        'state',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'state' => UserState::class,
    ];

    protected function registerStates(): void
    {
        $this->addState('state', UserState::class)
            ->default(\App\States\Active::class)
            ->allowTransition(\App\States\Active::class, \App\States\Banned::class)
            ->allowTransition(\App\States\Banned::class, \App\States\Active::class);
    }
}
