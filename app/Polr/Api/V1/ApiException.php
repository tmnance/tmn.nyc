<?php namespace App\Polr\Api\V1;

use Exception;

class ApiException extends Exception
{
    public function __construct($message, $code)
    {
// var_dump($message, $code);
//         echo "hI";die;
        return \Response::json(
            [
                'error' => true,
                'message' => $message,
                'code' => $code,
            ],
            $code
        );
    }
}
