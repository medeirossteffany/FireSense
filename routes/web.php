<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandController;
use Inertia\Inertia;
use App\Models\Land;
use Illuminate\Http\Request;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/lands', [LandController::class, 'index'])->name('lands');
    Route::post('/lands', [LandController::class, 'store']);
    Route::put('/lands/{land}', [LandController::class, 'update']);

    Route::get('/dashboard', function (Request $request) {
        $user = $request->user();

        $lands = Land::where('id_users', $user->id)
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->get(['id', 'name', 'city', 'state', 'latitude', 'longitude']);

        return Inertia::render('Dashboard', [
            'lands' => $lands,
        ]);
    })->middleware(['auth', 'verified'])->name('dashboard');
});

require __DIR__.'/auth.php';
