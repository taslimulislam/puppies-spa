<?php

use App\Http\Controllers\PuppyController;
use Illuminate\Support\Facades\Route;

Route::post('/puppies', [PuppyController::class, 'store']);
Route::patch('/puppies/{puppy}/like', [PuppyController::class, 'toggleLike']);
