<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
{
    $this->call([
        PoliceUnitSeeder::class,
        PoliceStationSeeder::class,
        ComplaintTypeSeeder::class,
    ]);
}
}


