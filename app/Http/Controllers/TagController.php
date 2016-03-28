<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Tag;
use Illuminate\Http\Request;

class TagController extends Controller {

    public function getAll(){
        return Tag::select('id','title')->get();
    }

    public function getAllwithPosts(){
        return Tag::select('id','title')
            ->with(['posts'=>function($q){
                $q->select('id','title')->active();
            }])
            ->get();
    }

    public function getCreatedAtAttribute($value){
        $value = date('U', strtotime($value));
        return $value * 1000;
    }

    public function getUpdatedAtAttribute($value){
        $value = date('U', strtotime($value));
        return $value * 1000;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(){
        return Tag::get();
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show($id){
        return Tag::find($id);
    }

    public function save(Request $request){
        $tag = null;
        if ($request->input('id')){ //edit
            $tag = Tag::find($request->input('id'));
        } else { //new
            $tag = new Tag();
        }
        $tag->title = $request->input('title');
        $tag->save();
        return $tag;
    }
}
