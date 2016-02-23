<?php namespace App\Polr\Api\V1;

class ViewFactory
{
    public static function getView($view = null)
    {
        if (empty($view)) {
            $view = 'View';
        }
        $viewClass = 'App\Polr\Api\V1\Views\\' . $view;
        return new $viewClass();
    }
}
