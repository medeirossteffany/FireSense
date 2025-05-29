<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Land extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'hectares',
        'state',
        'neighborhood',
        'city',
        'street',
        'number',
        'latitude',
        'longitude',
        'id_users',
        'id_crops',
    ];

    public function crop()
    {
        return $this->belongsTo(Crop::class, 'id_crops');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_users');
    }
}
