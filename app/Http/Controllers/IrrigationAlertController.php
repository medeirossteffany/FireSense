<?php

namespace App\Http\Controllers;

use App\Models\Land;
use App\Models\IrrigationHistory;
use Illuminate\Support\Facades\Http;


class IrrigationAlertController extends Controller
{
    public function alert($landId)
    {
        $land = Land::findOrFail($landId);

        if ($land->fire_risk > 40) {
            $esp32Ip = 'http://192.168.1.19';

            $response = Http::withoutVerifying()->get("$esp32Ip/activate", [
                'id_land' => $land->id
            ]);

            if ($response->successful()) {
                IrrigationHistory::create([
                    'land_id' => $land->id,
                    'date' => now(),
                    'status' => true,
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Buzzer e luz ativados e histórico salvo!',
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