<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Land;
use App\Models\IrrigationHistory;

class IrrigationHistorySeeder extends Seeder
{
    public function run()
    {
        $lands = Land::limit(4)->get(); 

        foreach ($lands as $land) {
            IrrigationHistory::create([
                'id_lands' => $land->id, 
                'date' => now(),         
                'status' => false,       
            ]);
        }
    }
}