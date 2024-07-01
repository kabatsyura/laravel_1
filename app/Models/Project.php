<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

// Определение модели Project, которая представляет собой проект в системе.
class Project extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'image_path',
        'name',
        'description',
        'status',
        'due_date',
        'created_by',
        'updated_by',
    ];

    // Определение отношения "один ко многим" с моделью Task.
    // Это значит, что один проект может иметь много задач.
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    // Определение отношения "обратное один ко многим" с моделью User.
    // Это значит, что проект принадлежит одному пользователю, который его создал.
    // Внешний ключ в базе данных называется 'created_by'.
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Определение отношения "обратное один ко многим" с моделью User.
    // Это значит, что проект принадлежит одному пользователю, который его обновил.
    // Внешний ключ в базе данных называется 'updated_by'.
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
