<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Crop extends Model
{
    use HasFactory;

    protected $fillable = ['type'];

    public function lands()
    {
        return $this->hasMany(Land::class, 'id_crops');
    }
}