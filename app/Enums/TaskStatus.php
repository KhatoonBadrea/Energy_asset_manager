<?php

namespace App\Enums;

enum TaskStatus: string
{
    
    case Todo = 'todo';
    case InProgress = 'in_progress';
    case Done = 'done';

    /**
     * تسمية قابلة للعرض بالواجهة - بتخلي الـ React ياخد قيمة جاهزة بدل ما يترجم الـ value يدوياً.
     */
    public function label(): string
    {
        return match ($this) {
            self::Todo => 'To do',
            self::InProgress => 'In progress',
            self::Done => 'Done',
        };
    }
}
