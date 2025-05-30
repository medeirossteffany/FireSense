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
            'lands' => Land::with('crop')->where('id_users', $user->id)->get(),
            'crops' => Crop::all()
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => 'required',
            'hectares' => 'required|numeric',
            'state' => 'required',
            'neighborhood' => 'required',
            'city' => 'required',
            'street' => 'required',
            'number' => 'required',
            'type' => 'required|string|max:255',
        ]);

        $crop = Crop::firstOrCreate(['type' => $validated['type']]);
        $address = "{$validated['street']}, {$validated['number']}, {$validated['city']}, {$validated['state']}";
        $coordinates = $this->getCoordinates($address);

        Land::create([
            'name' => $validated['name'],
            'hectares' => $validated['hectares'],
            'state' => $validated['state'],
            'neighborhood' => $validated['neighborhood'],
            'city' => $validated['city'],
            'street' => $validated['street'],
            'number' => $validated['number'],
            'latitude' => $coordinates['lat'],
            'longitude' => $coordinates['lon'],
            'id_crops' => $crop->id,
            'id_users' => $user->id,
        ]);
    }

    public function update(Request $request, Land $land)
    {
        $validated = $request->validate([
            'name' => 'required',
            'hectares' => 'required|numeric',
            'state' => 'required',
            'neighborhood' => 'required',
            'city' => 'required',
            'street' => 'required',
            'number' => 'required',
            'type' => 'required|string|max:255',
        ]);

        $crop = Crop::firstOrCreate(['type' => $validated['type']]);
        $address = "{$validated['street']}, {$validated['number']}, {$validated['city']}, {$validated['state']}";
        $coordinates = $this->getCoordinates($address);

        $land->update([
            'name' => $validated['name'],
            'hectares' => $validated['hectares'],
            'state' => $validated['state'],
            'neighborhood' => $validated['neighborhood'],
            'city' => $validated['city'],
            'street' => $validated['street'],
            'number' => $validated['number'],
            'latitude' => $coordinates['lat'],
            'longitude' => $coordinates['lon'],
            'id_crops' => $crop->id,
        ]);
    }

    private function getCoordinates($address)
    {
        $url = 'https://nominatim.openstreetmap.org/search?' . http_build_query([
            'q' => $address,
            'format' => 'json',
            'limit' => 1,
        ]);

        $options = [
            "http" => [
                "header" => "User-Agent: LandApp/1.0\r\n"
            ]
        ];

        $context = stream_context_create($options);
        $response = file_get_contents($url, false, $context);

        $data = json_decode($response, true);

        if (!empty($data)) {
            return [
                'lat' => $data[0]['lat'],
                'lon' => $data[0]['lon'],
            ];
        }

        return [
            'lat' => null,
            'lon' => null,
        ];
    }
}
