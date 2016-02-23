<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedPollData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $poll_table_name = 'poll';
        $option_table_name = 'poll_option';
        $vote_table_name = 'poll_vote';

        $poll_data = [
            [
                'name' => 'Favorite saying?',
                'options' => [
                    [
                        'name' => 'LMAO',
                        'url' => null,
                        'votes' => [
                            0.25,
                            0.5,
                            0.3,
                        ],
                    ],
                    [
                        'name' => 'GTFO',
                        'url' => null,
                        'votes' => [
                            0.5,
                            0.5,
                            0.7,
                        ],
                    ],
                    [
                        'name' => 'YOLO',
                        'url' => null,
                        'votes' => [
                            0.25,
                            // 0,
                            // 0,
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Favorite pup?',
                'options' => [
                    [
                        'name' => 'pug',
                        'url' =>
                            'https://s-media-cache-ak0.pinimg.com/736x/b1/c3/43/b1c3438eafcda6d062cc9838e8b8e348.jpg',
                        'votes' => [
                            0.25,
                            0.5,
                            0.3,
                        ],
                    ],
                    [
                        'name' => 'pit',
                        'url' => 'https://pmcdeadline2.files.wordpress.com/2014/10/pitbull.png?w=446&h=299&crop=1',
                        'votes' => [
                            0.5,
                            0.5,
                            0.7,
                        ],
                    ],
                    [
                        'name' => 'pom',
                        'url' => 'http://i.ytimg.com/vi/gJir5cxLv9U/maxresdefault.jpg',

                        'votes' => [
                            0.25,
                            // 0,
                            // 0,
                        ],
                    ],
                ],
            ],
        ];

        foreach ($poll_data as $poll) {
            $poll_id = DB::table($poll_table_name)->insertGetId([
                'name' => $poll['name'],
            ]);
            $order = 1;
            foreach ($poll['options'] as $option) {
                $option_id = DB::table($option_table_name)->insertGetId([
                    'name' => $option['name'],
                    'url' => $option['url'],
                    'poll_id' => $poll_id,
                    'order' => $order++,
                ]);
                foreach ($option['votes'] as $vote) {
                    DB::table($vote_table_name)->insert([
                        'option_id' => $option_id,
                        'weighted_vote' => $vote,
                    ]);
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
