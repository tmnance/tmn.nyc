<?php namespace App\Polr\Models;

use Illuminate\Database\Eloquent\Model;

class Base extends Model
{
    public static function boot()
    {
        parent::boot();
    }

    /**
     * Generic method to search a table's fields given a list of key/value pairs.
     *
     * @param array $searches List of key/value pairs.  The key names need to
     *                        correspond to table column names.
     *                        TODO: Column field existence check?
     *
     * @return stdObj
     */
    public static function searchFields($searches)
    {
        $instance = new static;

        if (empty($searches)) {
            return [];
        }

        foreach ($searches as $key => $val) {
            if (method_exists($instance, "scope{$key}")) {
                $instance = $instance->$key($val);
            } else {
                $where = "where{$key}";
                $instance = $instance->$where($val);
            }
        }

        return $instance;
    }

    /**
     * Static function to get the table name of a model.
     * @return string The table name of an Eloquent model.
     */
     public static function getTableName()
     {
         return with(new static)->getTable();
     }

    /**
     * Filter out the records with deleted associated records
     *
     * @param  Illuminate\Database\Eloquent\Builder $query
     * @param  string $relationship_name
     *
     * @return Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithActive($query, $relationship_name)
    {
        return  $query->whereHas($relationship_name, function($q) {
            $q->whereNull('deleted_at');
        });
    }
}
