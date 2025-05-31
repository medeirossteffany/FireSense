<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class IrrigationHistorySeeder extends Seeder
{
    public function run()
    {
        DB::table('irrigation_histories')->insert([
            [
                'date' => Carbon::now(),
                'status' => true, // id = 1 (ativo)
                'id_lands' => 1,
            ],
            [
                'date' => Carbon::now(),
                'status' => false, // id = 2
                'id_lands' => 2,
            ],
            [
                'date' => Carbon::now(),
                'status' => false, // id = 3
                'id_lands' => 3,
            ],
        ]);
    }
}
