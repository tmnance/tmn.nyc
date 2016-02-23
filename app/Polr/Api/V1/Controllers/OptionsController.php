<?php namespace App\Polr\Api\V1\Controllers;

use App\Polr\Api\V1\RestController;
use App\Polr\Models\Option;

class OptionsController extends RestController
{
    protected static $apiName = 'Options API';
    protected static $apiId = 'OPTIONS';
    protected $resourceModel = Option::class;
    protected $resourceView = 'Option';
}
