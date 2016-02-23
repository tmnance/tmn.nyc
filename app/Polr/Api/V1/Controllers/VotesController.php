<?php namespace App\Polr\Api\V1\Controllers;

use App\Polr\Api\V1\RestController;
use App\Polr\Models\Vote;

class VotesController extends RestController
{
    protected static $apiName = 'Votes API';
    protected static $apiId = 'VOTES';
    protected $resourceModel = Vote::class;
    protected $resourceView = 'Vote';
}
