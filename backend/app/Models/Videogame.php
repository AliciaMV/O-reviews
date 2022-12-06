<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Videogame extends Model
{
    // on modifie les champs en $fillable pour la méthode create
    protected $fillable = ['name', 'editor', 'status'];

    
    /**
     * Get all related reviews
     */
    public function reviews()
    {
        return $this->hasMany('App\Models\Review');
    }
}
