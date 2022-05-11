<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\LoginController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::middleware(['cors'])->group(function () {
    Route::post('register', [RegisterController::class, 'store']);
    Route::post('login', [LoginController::class, 'login']);
    Route::get('user/{token}', [AuthController::class, 'index']);
    Route::get('user/getaccount/{token}', [UserController::class, 'accountchecker']);
});
