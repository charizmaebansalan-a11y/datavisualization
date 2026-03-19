<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RecordController;
use App\Http\Controllers\Api\RecordsController;

Route::get('/records', [RecordsController::class, 'index']);