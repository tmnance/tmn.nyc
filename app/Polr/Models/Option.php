<?php namespace App\Polr\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class Option extends Base
{
    use SoftDeletes;

    protected $table = 'poll_option';
    public $timestamps = true;

    protected $guarded = [
        'id',
    ];

    public function votes()
    {
        return $this->hasMany(Vote::class, 'option_id');
    }
}
