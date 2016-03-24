<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/users', 'UserController@getAllUsers');

/*Route::controller("user", "UserController");
Route::resource("user", "UserController");*/

Route::get('/users_posts', function () {
    $user = \App\User::all();

    foreach ($user as $u) {
        echo "<h1>{$u->name}</h1>";
        echo "<ul>";
        foreach ($u->posts as $post) {
            echo "<li>{$post->title}</li>";
            if (count($post->tags) > 0){
                echo "Tags:<ol>";
                foreach ($post->tags as $tag) {
                    echo "<li>$tag->title</li>";
                }
                echo "</ol>";
            }
        }
        echo "</ul>";
    }

});
