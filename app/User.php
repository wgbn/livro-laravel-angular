<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable {

    protected $fillable = ['name', 'email', 'password'];
    protected $hidden = ['password', 'remember_token'];
    protected $appends = ['chunk_email'];

    public function posts(){
        return $this->hasMany('App\Post');
    }

    public function comments(){
        return $this->hasManyThrough('App\Comment','App\Post');
    }

    public function getChunkEmailAttribute($value){
        $arrayEmail = explode("@", $this->email);
        if (count($arrayEmail)!=2) return $value;
        $chunkEmail1 = substr($arrayEmail[0],0,2);
        $chunkEmail2 = $arrayEmail[1];
        return $chunkEmail1 . "...@" . $chunkEmail2;
    }
}
