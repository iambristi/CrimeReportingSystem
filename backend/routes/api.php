<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\DropdownController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
|--------------------------------------------------------------------------
| Dropdown APIs
|--------------------------------------------------------------------------
*/

Route::get('/police-unit-types', [DropdownController::class, 'unitTypes']);
Route::get('/police-units/{type}', [DropdownController::class, 'unitsByType']);
Route::get('/police-stations/{unitId}', [DropdownController::class, 'policeStations']);
Route::get('/complaint-types', [DropdownController::class, 'complaintTypes']);


/*
|--------------------------------------------------------------------------
| Complaint API (we’ll use this next)
|--------------------------------------------------------------------------
*/

Route::post('/complaint', [ComplaintController::class, 'store']);
