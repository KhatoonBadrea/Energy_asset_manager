<?php

namespace App\Models;

use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;


    protected $fillable = [
        'project_id',
        'title',
        'description',
        'status',
    ];

    protected function casts(): array
    {
        return [
            // بفضل هاد الـ cast، $task->status بيرجع TaskStatus enum جاهز
            // مش string خام - بمنع أي قيمة غلط توصل للـ database من الأساس
            'status' => TaskStatus::class,
        ];
    }

    /**
     * المشروع اللي تتبعله هالمهمة.
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
