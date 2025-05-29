<?php

namespace App\Http\Controllers;

use App\Models\Land;
use App\Models\Crop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('RegisterLand/Page', [
            'lands' => Land::with('crop')->get(),
            'crops' => Crop::all()
        ]);
    }

    public function store(Request $request)
{

    $user = $request->user();

    $request->validate([
        'name' => 'required',
        'hectares' => 'required|numeric',
        'state' => 'required',
        'neighborhood' => 'required',
        'city' => 'required',
        'street' => 'required',
        'number' => 'required',
        'latitude' => 'nullable|numeric',
        'longitude' => 'nullable|numeric',
        'type' => 'required|string|max:255',
    ]);

    $crop = Crop::firstOrCreate(['type' => $request->type]);

    Land::create([
        'name' => $request->name,
        'hectares' => $request->hectares,
        'state' => $request->state,
        'neighborhood' => $request->neighborhood,
        'city' => $request->city,
        'street' => $request->street,
        'number' => $request->number,
        'latitude' => $request->latitude,
        'longitude' => $request->longitude,
        'id_crops' => $crop->id,
        'id_users' => $user->id,
    ]);
}


public function update(Request $request, Land $land)
{
    $request->validate([
        'name' => 'required',
        'hectares' => 'required|numeric',
        'state' => 'required',
        'neighborhood' => 'required',
        'city' => 'required',
        'street' => 'required',
        'number' => 'required',
        'latitude' => 'nullable|numeric',
        'longitude' => 'nullable|numeric',
        'type' => 'required|string|max:255',
    ]);

    $crop = Crop::firstOrCreate(['type' => $request->type]);

    $land->update([
        'name' => $request->name,
        'hectares' => $request->hectares,
        'state' => $request->state,
        'neighborhood' => $request->neighborhood,
        'city' => $request->city,
        'street' => $request->street,
        'number' => $request->number,
        'latitude' => $request->latitude,
        'longitude' => $request->longitude,
        'id_crops' => $crop->id,
    ]);
}

}
