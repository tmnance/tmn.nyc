<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePollVoteTable extends Migration
{
    static private $table_name = 'poll_vote';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists(self::$table_name);

        Schema::create(self::$table_name, function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->softDeletes();
            $table->decimal('weighted_vote');
            $table->integer('option_id')->unsigned();

            // add foreign keys
            $table->foreign('option_id')
                ->references('id')
                ->on('poll_option')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists(self::$table_name);
    }
}
