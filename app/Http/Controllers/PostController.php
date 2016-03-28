<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller {

    public function last($n = 3){
        return Post::select('id', 'title', 'text', 'active', 'user_id')
            ->with(['tags' => function($query){
                $query->select('id', 'title');
            }])
            ->with(['comments' => function($query){
                $query->select('active', 'post_id');
            }])
            ->with(['user'=>function($q){
                $q->select('id', 'name', 'email');
            }])
            ->orderBy('id', 'desc')
            ->take($n)
            ->get();
    }

    public function index(){
        return Post::with(['user'=>function($q){
            $q->select('id','name','email');
        }])->get();
    }

    public function getTitles(){
        return Post::select('id','title')->get();
    }

    public function show($id){
        return Post::select('*')
            ->with(['user'=>function($q){
                $q->select('id','name','email');
            }])
            ->find($id);
    }

    public function save(Request $request){
        if (Auth::user() == null)
            throw new \Exception("Necessário login");
        if ($request->input('id') != null && Auth::user()->id != $request->input('user_id'))
            throw new \Exception("Você pode editar apenas os seus posts");

        $post = null;

        if ($request->input('id')){ //edit
            $post = Post::find($request->input('id'));
        } else { //new
            $post = new Post();
        }
        $post->user_id = Auth::user()->id;
        $post->title = $request->input('title');
        $post->text = $request->input('text');
        $post->active = $request->input('active');
        $post->save();
        return $post;
    }
}
