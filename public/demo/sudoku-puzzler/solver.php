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

$default_puzzle_string = '2..7..5...7...1....493.8..772..961....5..3.743.1.....9..2...76.95....4..18..6.3..';
$puzzle_string_raw = (array_key_exists('puzzle_string', $_POST) ? $_POST['puzzle_string'] : '') ?: $default_puzzle_string;
?>



<table cellspacing="0" cellpadding="10" border="0">
    <tr>
        <td valign="top">
            <h3>Puzzle string to solve</h3>
            <form action="solver.php" method="post">
                <p>
                    <textarea name="puzzle_string" style="width: 250px; height: 250px; font-family: monospace;"><?php echo $puzzle_string_raw;?></textarea>
                </p>
                <input type="submit" />
            </form>
        </td>
        <td valign="top">
            <h3>Solution</h3>
<?php
echo '<pre>';
$start_time = microtime(true);

$puzzle_string = preg_replace('/[^1-9\.]/', '', $puzzle_string_raw);
if (strlen($puzzle_string) != 81 || substr_count($puzzle_string, '.') > 64) {
    echo 'Badly formed puzzle string, must be exactly 81 characters and have no more than 64 unknowns';
} else {
    exec("{$python_path} lib-python/sudoku-solver.py -p {$puzzle_string} --pretty 2>&1", $exec_output, $err);

    if (strpos(implode('', $exec_output), '--+--') !== false) {
        // output has a grid
        $pretty_grid = $exec_output;
        $condensed_grid = preg_replace('/[^1-9\.]/', '', implode('', $pretty_grid));

        $elapsed_time = microtime(true) - $start_time;

        echo "elapsed time = {$elapsed_time}\n\n";

        echo implode("\n", $pretty_grid);
        echo "\n" . $condensed_grid;
    } else {
        echo implode("\n", $exec_output);
    }
}
echo '</pre>';
?>
        </td>
    </tr>
</table>
