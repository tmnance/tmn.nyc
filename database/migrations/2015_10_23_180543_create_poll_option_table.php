<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePollOptionTable extends Migration
{
    static private $table_name = 'poll_option';

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
            $table->string('name');
            $table->integer('poll_id')->unsigned();
            $table->integer('order')->unsigned();
            $table->string('url')->nullable();

            $table->foreign('poll_id')
                ->references('id')
                ->on('poll')
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
