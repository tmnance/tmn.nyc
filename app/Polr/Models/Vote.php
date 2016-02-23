<?php namespace App\Polr\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class Vote extends Base
{
    use SoftDeletes;

    protected $table = 'poll_vote';
    public $timestamps = true;

    protected $guarded = [
        'id',
    ];
}
