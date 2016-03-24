<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => "Walter",
            'email' => 'walter.wgbn@gmail.com',
            'password' => bcrypt('123456'),
        ]);
        DB::table('users')->insert([
            'name' => "Theo",
            'email' => 'wgbn.theo@gmail.com',
            'password' => bcrypt('123'),
        ]);
    }
}
