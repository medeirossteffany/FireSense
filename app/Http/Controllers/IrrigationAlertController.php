<?php

namespace App\Http\Controllers;

use App\Models\Land;
use Illuminate\Support\Facades\Http;


class IrrigationAlertController extends Controller
{
    public function alert($landId)
    {
        $land = Land::findOrFail($landId);

        if ($land->fire_risk > 30) {
            $esp32Ip = 'http://192.168.1.100'; 

            $response = Http::withoutVerifying()->get("$esp32Ip/activate", [
                'id_land' => $land->id
            ]);

            if ($response->successful()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Buzzer e luz ativados!',
                    'response' => $response->body()
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Falha ao comunicar com o ESP32.',
                    'response' => $response->body()
                ], 500);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Risco de incêndio baixo, não acionado.'
            ]);
        }
    }
}