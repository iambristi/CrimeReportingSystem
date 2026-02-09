<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('complaints', function (Blueprint $table) {
        $table->id();

        // Section 1: Complainant Information
        $table->string('name');
        $table->string('phone');
        $table->text('address');
        $table->string('city');
        $table->string('state');
        $table->string('zip');

        // Section 2: Incident Details
        $table->text('accused_names')->nullable();
        $table->date('incident_date');
        $table->time('incident_time');
        $table->string('incident_location');

        // Section 3 & 4: Dropdown relations
        $table->unsignedBigInteger('police_unit_id');
        $table->unsignedBigInteger('police_station_id');
        $table->unsignedBigInteger('complaint_type_id');

        // Complaint Details
        $table->text('description');
        $table->string('evidence_path')->nullable();

        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
