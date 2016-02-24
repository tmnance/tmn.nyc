<?php

const API_V1_CONTROLLER_BASE = '\App\Polr\Api\V1\Controllers\\';

// HOME PAGE ===================================
// we dont need to use Laravel Blade
// we will return a PHP file that will hold all of our Angular content
// see the "Where to Place Angular Files" below to see ideas on how to structure your app return
Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'api/v1'], function () {
    // since we will be using this just for CRUD, we won't need create and edit
    // Angular will handle both of those forms
    // this ensures that a user can't access api/create or api/edit when there's nothing there
    Route::resource('polls', API_V1_CONTROLLER_BASE . 'PollsController');
    Route::resource('options', API_V1_CONTROLLER_BASE . 'OptionsController');
    Route::resource('votes', API_V1_CONTROLLER_BASE . 'VotesController');

    /*,
        ['only' => ['index', 'store', 'update', 'destroy']]
    );*/
});

// all routes that are not home or api will be redirected to the frontend
// this allows angular to route them
Route::any('{catchall}', function ($page) {
    return view('index');
})->where('catchall', '(.*)');
