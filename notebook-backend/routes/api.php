<?php

use Illuminate\Http\Request;

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

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@authenticate');

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'AuthController@getAuthenticatedUser');

    Route::get('notes', 'NotesController@getAll');
    Route::get('notes/{id}', 'NotesController@get');
    Route::post('notes', 'NotesController@add');
    Route::put('notes/{id}', 'NotesController@edit');
    Route::delete('notes/{id}', 'NotesController@delete');
});