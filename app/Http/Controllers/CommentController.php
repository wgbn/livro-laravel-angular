<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Http\Requests;
use Illuminate\Http\Request;

class CommentController extends Controller {

    public function last($n=3){
        return Comment::select('id','text','post_id')
            ->active()
            ->orderBy('id', 'desc')
            ->with(['post'=>function($q){
                $q->select('id','title');
            }])
            ->take($n)
            ->get();
    }

    public function getAll(){
        return Comment::select('id','text', 'email', 'post_id')
            ->active()
            ->orderBy('id', 'desc')
            ->with(['post'=>function($q){
                $q->select('id','title');
            }])
            ->get();
    }

    public function getCommentsByPost($id){
        return Comment::select('*')
            ->where('post_id', '=', $id)
            ->get();
    }

    public function save(Request $request){
        $comment = null;
        if ($request->input('id')){ //edit
            $comment=Comment::find($request->input('id'));
        }else{ //new
            $comment = new Comment();
        }
        $comment->text = $request->input('text');
        $comment->active = $request->input('active');
        $comment->email = $request->input('email');
        $comment->save();
        return $comment;
    }
}
