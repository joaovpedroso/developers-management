<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Developer extends Model
{
    use HasFactory;

    public $timestamps = true;

    public $fillable = [
        "nome",
        "hobby",
        "nivel_id",
        "sexo",
        "data_nascimento",
        "idade"
    ];

    public function nivel()
    {
        return $this->hasOne(Level::class, 'id', 'nivel_id');
    }
}
