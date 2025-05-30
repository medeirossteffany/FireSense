<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Land;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $lands = Land::where('id_users', $user->id)->get();



        return Inertia::render('Dashboard', [
            'lands' => $lands,
        ]);
    }
}