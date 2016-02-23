<?php namespace App\Polr\Api\V1\Views;

class Option extends View
{
    public function __construct()
    {
        $this->referenceColumns([
            'votes' => $this->getView('Vote')
                ->unsetColumnsExcept([
                    'weighted_vote',
                ]),
        ]);
    }

    public function render($data)
    {
        return parent::render($data);
    }
}
