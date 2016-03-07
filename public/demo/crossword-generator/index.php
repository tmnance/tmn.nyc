<?php
require_once '../../../vendor/tmnance/crossword-generator/library/autoloader.php';

use CrosswordPuzzle\Builder as PuzzleBuilder;

$default_word_list = str_replace(' ', "\n", 'tilde narwhal helvetica vegan humblebrag cronut tote axe chambray');
$words_raw = (array_key_exists('words', $_POST) ? $_POST['words'] : '') ?: $default_word_list;
?>

<table cellspacing="0" cellpadding="10" border="0">
    <tr>
        <td valign="top">
            <h3>Words to process</h3>
            <form action="index.php" method="post">
                <p>
                    <textarea name="words" style="width: 250px; height: 250px;"><?php echo $words_raw;?></textarea>
                </p>
                <input type="submit" />
            </form>
        </td>
        <td valign="top">
            <h3>Generated Crossword</h3>

<?php
echo '<pre>';
if (!empty($words_raw)) {
    // remove garbage chars
    $words_raw = str_replace(["\r", ' ', ','], ['', "\n", "\n"], $words_raw);
    $words_list = explode("\n", $words_raw);

    // cleanup input
    $words_list = array_map('trim', $words_list);
    $words_list = array_filter($words_list);

    // words themselves will be the array keys
    $words_list = array_flip($words_list);

    // assign filler clues
    foreach ($words_list as $key => $value) {
        $words_list[$key] = "{$key} definition";
    }

    try {
        $puzzle = (new PuzzleBuilder())->setSource($words_list);
        $best_result_grid = $puzzle->getBestScoreGrid();

        echo 'Processing time -- ' . $puzzle->getElapsedTime() . "\n\n";

        $best_result_grid->debug();
    } catch (Exception $e) {
        echo "{$e->getMessage()}\n\n";
    }

    echo "done";
} else {
    echo "no input";
}
echo '</pre>';
?>
        </td>
    </tr>
</table>
