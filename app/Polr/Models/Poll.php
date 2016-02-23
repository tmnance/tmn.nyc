<?php namespace App\Polr\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class Poll extends Base
{
    use SoftDeletes;

    protected $table = 'poll';
    public $timestamps = true;

    protected $guarded = [
        'id',
    ];

    public function options()
    {
        return $this->hasMany(Option::class, 'poll_id')->orderBy('order');
    }
}
