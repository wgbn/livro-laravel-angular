<?php

namespace App\Http\Controllers;

use App\Http\Requests;

class BlogController extends Controller {

    public function getMenuInfo(){
        $tagController = new TagController();
        $commentController = new CommentController();
        return array(
            $tagController->getAll(),
            $commentController->last()
        );
    }

}
