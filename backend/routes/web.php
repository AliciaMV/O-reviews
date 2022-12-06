<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

// --------- VIDEOGAMES ---------

use App\Http\Controllers\VideogameController;

$router->get(
    'videogames/{id}',
    [
        'as' => 'videogame-read',
        'uses' => 'VideogameController@read'
    ]
);

$router->get('videogames', ['as' => 'videogame-list', 'uses' => 'VideogameController@list']);

$router->get(
    'videogames/{id}/reviews',
    [
        'as' => 'videogame-getreviews',
        'uses' => 'VideogameController@getReviews'
    ]
);

$router->post('videogames', ['as' => 'videogame-create', 'uses' => 'VideogameController@create']);


// --------- REVIEWS ---------

$router->get(
    'reviews',
    [
        'as' => 'review-list',
        'uses' => 'ReviewController@list'
    ]
);
