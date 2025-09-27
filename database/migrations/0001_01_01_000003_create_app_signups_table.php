<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('app_signups', function (Blueprint $table) {
            $table->id();
            $table->string('identifier');
            $table->string('method');
            $table->string('platform')->nullable();
            $table->timestamp('ts')->nullable();
            $table->string('ip')->nullable();
            $table->string('user_agent', 512)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('app_signups');
    }
};
