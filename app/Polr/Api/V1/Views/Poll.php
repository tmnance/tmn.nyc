<?php namespace App\Polr\Api\V1\Views;

class Poll extends View
{
    public function __construct()
    {
        $this->referenceColumns([
            'options' => $this->getView('Option')->unsetColumns(['poll_id']),
        ]);
    }

    public function render($data)
    {
        return parent::render($data);
    }
}
