<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
 
            // string مش native enum بقصد: كل منطق الحالات محصور بـ App\Enums\TaskStatus
            // هيك بنضيف حالة جديدة بدون ما نحتاج migration تانية لتعديل نوع العمود بـ PostgreSQL
            $table->string('status', 20)->default('todo');
 
            $table->timestamps();
 
            $table->index('project_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
