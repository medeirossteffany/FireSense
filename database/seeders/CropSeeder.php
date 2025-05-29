<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Crop;

class CropSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $crops = [
            'Milho', 'Soja', 'Cana-de-açúcar', 'Arroz', 'Feijão',
            'Café', 'Trigo', 'Algodão', 'Tomate', 'Batata'
        ];

        foreach ($crops as $type) {
            Crop::firstOrCreate(['type' => $type]);
        }
    }
}