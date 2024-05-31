<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LevelsController;
use App\Http\Controllers\Api\DevelopersController;

Route::controller(LevelsController::class)->group(function () {
    Route::get('/niveis', 'index');
    Route::post('/niveis', 'store');
    Route::put('/niveis/{id}', 'update');
    Route::delete('/niveis/{id}', 'destroy');
});

Route::controller(DevelopersController::class)->group(function () {
    Route::get('/desenvolvedores', 'index');
    Route::post('/desenvolvedores', 'store');
    Route::put('/desenvolvedores/{id}', 'update');
    Route::delete('/desenvolvedores/{id}', 'destroy');
});
