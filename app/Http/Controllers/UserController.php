<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class UserController extends Controller {

    public function getAllUsers(){
        return User::all();
    }

    public function getAllPosts(){
        return User::select('id','name','email')
            ->with(['posts'=>function($q){
                $q->select('id','title','user_id')->active();
            }])
            ->get();
    }

    public function doLogin(Request $request){
        if (Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('password')])) {
            return Auth::user();
        } else {
            throw new \Exception("Não foi possível realizar o login. Tente novamente.");
        }
    }

    public function doLogout(){
        Auth::logout();
        return Auth::user(); //tem q ser nulo
    }

    public function createLogin(Request $request){
        $theUser = User::where('email', '=', $request->input('email'))->first();
        if ($theUser)
            throw new \Exception("Este email já está cadastrado");

        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = bcrypt($request->input('password'));
        $user->save();
        Auth::login($user);
        return Auth::user();
    }

    public function getLogin(){
        return Auth::user();
    }

    public function saveFromRequest(Request $request){
        $user = null;
        if ($request->id){ //edit
            $user=User::find($request->id);
        }else{ //new
            $user = new User();
        }
        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();
        return $user;
    }

    public function index(){
        return User::get();
    }

    public function show($id){
        return User::find($id);
    }
}
