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
        Schema::create('forecast_histories', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->decimal('air_temperature', 5, 2);
            $table->decimal('air_pressure', 6, 2);
            $table->decimal('air_humidity', 5, 2);
            $table->integer('region_fires');
            $table->integer('region_frosts');
            $table->integer('region_lightnings');
            $table->decimal('region_fire_risk_percent', 5, 2);
            $table->foreignId('id_lands')->constrained('lands')->onDelete('cascade');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forecast_histories');
    }
};
