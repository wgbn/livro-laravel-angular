<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Requests;

class UserController extends Controller {

    public function getAllUsers(){
        return User::all();
    }

}
