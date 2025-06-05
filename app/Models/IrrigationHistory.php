<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class IrrigationHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'status',
        'id_lands',
    ];

    public function land()
    {
        return $this->belongsTo(Land::class, 'id_lands');
    }
}
