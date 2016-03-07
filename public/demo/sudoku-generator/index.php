<?php

$python_path = null;

$filename = '.pythonpath';
if (file_exists($filename)) {
    $python_path = trim(file_get_contents($filename) ?: '');
}
if (empty($python_path)) {
    // python path required
    die;
}

$difficulty_options = [
    'very easy' => 1,
    'easy' => 2,
    'medium' => 3,
    'hard' => 4,
    'very hard' => 5,
];
$difficulty = (array_key_exists('difficulty', $_GET) ? $_GET['difficulty'] : null);
if (is_numeric($difficulty) && in_array(intval($difficulty), $difficulty_options)) {
    $difficulty = intval($difficulty);
} else {
    // default
    $difficulty = 1;
}


echo "<pre>";

$links = [];
foreach ($difficulty_options as $option_text => $option_value) {
    if ($difficulty == $option_value) {
        $option_text = "<strong>{$option_text}</strong>";
    } else {
        $option_text = "<a href='?difficulty={$option_value}'>{$option_text}</a>";
    }
    $links[] = $option_text;
}

echo implode(' | ', $links);
echo "\n<hr />\n";

$start_time = microtime(true);

exec("{$python_path} lib-python/sudoku-generator.py -d {$difficulty} --pretty 2>&1", $exec_output, $err);

$pretty_grid = $exec_output;
$condensed_grid = preg_replace('/[^1-9\.]/', '', implode('', $pretty_grid));


$elapsed_time = microtime(true) - $start_time;

echo "elapsed time = {$elapsed_time}\n\n";

echo implode("\n", $pretty_grid);
echo "\n" . $condensed_grid;

echo "</pre>";
