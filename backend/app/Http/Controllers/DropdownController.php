<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DropdownController extends Controller
{
    // 1️⃣ Return only two types
    public function unitTypes()
    {
        return ['Commissionerate', 'District'];
    }

    // 2️⃣ Units based on selected type
    public function unitsByType($type)
    {
        return DB::table('police_units')
            ->where('type', $type)
            ->select('id', 'name')
            ->orderBy('name')
            ->get();
    }

    // 3️⃣ Stations based on selected unit
    public function policeStations($unitId)
    {
        return DB::table('police_stations')
            ->where('police_unit_id', $unitId)
            ->select('id', 'station_name')
            ->orderBy('station_name')
            ->get();
    }
    public function complaintTypes()
    {
        return \DB::table('complaint_types')
            ->select('id', 'name')
            ->orderBy('name')
            ->get();
    }

}
