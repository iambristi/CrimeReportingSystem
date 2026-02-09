<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ComplaintController extends Controller
{
    public function store(Request $request)
{
    // Laravel automatically reads JSON
    $data = $request->all();

    // validation
    $request->validate([
        'name' => 'required',
        'phone' => 'required',
        'police_unit_id' => 'required',
        'police_station_id' => 'required',
        'complaint_type_id' => 'required',
        'description' => 'required',
    ]);

    // save
    \DB::table('complaints')->insert([
        'name' => $data['name'],
        'phone' => $data['phone'],
        'address' => $data['address'],
        'city' => $data['city'],
        'state' => $data['state'],
        'zip' => $data['zip'],
        'accused_names' => $data['accused_names'] ?? null,
        'incident_date' => $data['incident_date'],
        'incident_time' => $data['incident_time'],
        'incident_location' => $data['incident_location'],
        'police_unit_id' => $data['police_unit_id'],
        'police_station_id' => $data['police_station_id'],
        'complaint_type_id' => $data['complaint_type_id'],
        'description' => $data['description'],
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return response()->json([
        'message' => 'Complaint submitted successfully'
    ], 201);
}

}
