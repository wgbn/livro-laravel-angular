<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts')->insert([
            'title' => "My Second Post",
            'text' => ' Duis aute irure dolor in reprehenderit in vo\
luptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\
sint occaecat cupidatat non proident, sunt in culpa qui officia des\
erunt mollit anim id est laborum.',
            'user_id' => 1
        ]);
        DB::table('posts')->insert([
            'title' => "Hello World",
            'text' => 'Sed ut perspiciatis unde omnis iste natus err\
or sit voluptatem accusantium doloremque laudantium, totam rem aperi\
am, eaque ipsa quae ab illo inventore veritatis et quasi architecto \
beatae vitae dicta sunt explicabo',
            'user_id' => 2
        ]);
    }
}
