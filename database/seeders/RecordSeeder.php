<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Records;

class RecordSeeder extends Seeder
{
   
    public function run(): void
    {
        Records::factory()->count(30)->create();
    }
}
