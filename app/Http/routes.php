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

use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Redirect::to('/index.html');
});

/* rotas REST */
Route::post('/login', 'UserController@doLogin');
Route::get('/login','UserController@getLogin');
Route::get('/logout', 'UserController@doLogout');
Route::get('/menuinfo', 'BlogController@getMenuInfo');

Route::get('/posts/last/{n?}', 'PostController@last');
Route::get('/posts', 'PostController@index');
Route::get('/posts/getTitles', 'PostController@getTitles');
Route::get('/posts/{id}', 'PostController@show');
Route::post('/posts', ['middleware'=>'auth', 'uses'=>'PostController@save']);

Route::get('/users/posts', 'UserController@getAllPosts');
Route::post('/users/newlogin', 'UserController@createLogin');
Route::get('/users', 'UserController@index');
Route::get('/users/{id}', 'UserController@show');
Route::post('/users', ['middleware'=>'auth', 'uses'=>'UserController@saveFromRequest']);

Route::get('/comments', 'CommentController@getAll');
Route::get('/comments/post/{id}', 'CommentController@getCommentsByPost');
Route::post('/comments', ['middleware'=>'auth', 'uses'=>'CommentController@save']);

Route::get('/tags/posts', 'TagController@getAllWithPosts');
Route::get('/tags', 'TagController@index');
Route::get('/tags/{id}', 'TagController@show');
Route::post('/tags', ['middleware' => 'auth', 'uses' => 'TagController@save']);

/* exibe as rotas */
Route::get('routes', function(){
    \Artisan::call('route:list');
    return "<pre>".\Artisan::output()."</pre>";
});

/* teste */
Route::get('/test', function(){
    return \App\Comment::active()->get();
});
