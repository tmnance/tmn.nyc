<?php namespace App\Polr\Api\V1\Controllers;

use App\Polr\Api\V1\RestController;
use App\Polr\Models\Poll;

class PollsController extends RestController
{
    protected static $apiName = 'Polls API';
    protected static $apiId = 'POLLS';
    protected $resourceModel = Poll::class;
    protected $resourceView = 'Poll';

    protected $defaultRelationships = [
        'options',
    ];

    protected $allowedRelationships = [
        'options.votes',
    ];
}
