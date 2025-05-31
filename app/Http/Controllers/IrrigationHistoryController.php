<?php

namespace App\Http\Controllers;

use App\Models\IrrigationHistory;
use Inertia\Inertia;

class IrrigationHistoryController extends Controller
{
    public function index()
    {
        $histories = IrrigationHistory::with('land.crop')->get();

        return Inertia::render('Irrigation/Page', [
            'histories' => $histories,
        ]);

    }
}
