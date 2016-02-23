<?php

const API_V1_CONTROLLER_BASE = '\App\Polr\Api\V1\Controllers\\';

// HOME PAGE ===================================
// we dont need to use Laravel Blade
// we will return a PHP file that will hold all of our Angular content
// see the "Where to Place Angular Files" below to see ideas on how to structure your app return
Route::get('/', function () {
    return view('index');
});


Route::group(['prefix' => 'api/v1'], function() {
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


// Route::resource('/api/v1/tasks', API_V1_CONTROLLER_BASE . 'TasksController');

// App::missing(function($exception) {
//     return View::make('index');
// });


// // control panel api route setup
// Route::group(
//     [
//         'prefix' => 'api/{version}',
//     ],
//     function($router) {
//         // api urls in {version}/{controller} format
//         $api_urls = [
//             'v2/line-items',
//             'v2/line-item-types',
//         ];

//         foreach ($api_urls as $api_url) {
//             list($version, $controller) = explode('/', $api_url);
//             // convert version and controller into controller class name
//             $controller_class = '\App\Polr\Controllers\ApiV2\\' . strtoupper($version) . '\\' .
//                 // convert line-item-types into LineItemTypes
//                 str_replace(
//                     ' ',
//                     '',
//                     ucwords(
//                         str_replace('-', ' ', $controller)
//                     )
//                 ) .
//                 'Controller';
//             Route::resource(
//                 $controller,
//                 $controller_class
//             );
//         }
//     }
// );


/*
Route::get('/api/v2/line-item-types', function () {
    App\Model\LineItemType
    $results = DB::select('select * from ad_line_item_type where deleted_at IS NULL');

    echo json_encode($results);
    die;
});
*/
