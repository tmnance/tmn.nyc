<?php namespace App\Polr\Api\V1\Views;

use App\Polr\Api\V1\ViewFactory;

class View
{
    private $mutations = [];

    public function _construct() {}

    public function copyColumns($columns, $unsetSrc = false)
    {
        $this->mutations[] = function (&$data) use ($columns, $unsetSrc) {
            foreach ($columns as $colSrc => $colDest) {
                if ($colSrc != $colDest) {
                    $val = $this->getColumnValue($data, $colSrc);
                    $this->setColumnValue($data, $colDest, $val);
                    if ($unsetSrc) {
                        $this->unsetColumn($data, $colSrc);
                    }
                }
            }
        };
        return $this;
    }

    public function mapColumns($columns)
    {
        return $this->copyColumns($columns, true);
    }







    /**
     * Renders column data in its own view.
     * @param array $columns [$column => $view, ... ]
     *     The $view value can be either a string or an instance of ControlPanel\Api\View\V1\View.
     * @return ControlPanel\Api\View\V1\View
     */
    public function referenceColumns(array $columns = [])
    {
        $this->mutations[] = function(&$data) use ($columns) {
            foreach ($columns as $column => $view) {
                $val = $this->getColumnValue($data, $column);
                if ($val) {
                    if (is_string($view)) {
                       $view = $this->getView($view);
                    }
                    if ($this->isMultipleRelationValue($val)) {
                        $val = $view->renderList($val);
                    }
                    else {
                        $val = $view->render($val);
                    }
                    $this->setColumnValue($data, $column, $val);
                }
            }
        };
        return $this;
    }


    public function unsetColumns($columns)
    {
        $this->mutations[] = function (&$data) use ($columns) {
            foreach ($columns as $column) {
                $this->unsetColumn($data, $column);
            }
        };
        return $this;
    }


    public function unsetColumnsExcept($columns)
    {
        $this->mutations[] = function (&$data) use ($columns) {
            $dataNew = [];
            foreach ($columns as $column) {
                $dataNew[$column] = $data[$column];
            }
            $data = $dataNew;
        };
        return $this;
    }

    /**
     * Renders a list of data.
     * @param string|View $vew
     * @return mixed
     */
    public function renderList($data)
    {
        foreach ($data as $key => &$item) {
            // forward additional params to render function
            if (is_object($item)) {
                // The modify by reference doesn't work if the data is a list
                // of objects. So we do the reassignment.
                $data[$key] = $this->render([$item]);
            } else {
                $item = $this->render($item);
            }
        }

        return $data;
    }

    public function render($data)
    {
        foreach ($this->mutations as $mutationFn) {
            $mutationFn($data);
        }
        return $data;
    }

    // unset col through dot notation
    private function unsetColumn(&$data, $col) {
        $colParts = explode('.', $col);
        $i = 0;
        $dataTmp = &$data;
        foreach ($colParts as $colPart) {
            // last part
            if (++$i == count($colParts)) {
                unset($dataTmp[$colPart]);
            }
            else {
                if (!array_key_exists($colPart, $dataTmp)) {
                    return;
                }
                $dataTmp = &$dataTmp[$colPart];
            }
        }
    }

    // get col value through dot notation
    private function getColumnValue($data, $col) {
        return array_get($data, $col);
    }

    // set col value through dot notation
    private function setColumnValue(&$data, $col, $val) {
        array_set($data, $col, $val);
    }

    private function isMultipleRelationValue($value) {
        return !(bool)count(array_filter(array_keys($value), 'is_string'));
    }

    public function getView($name)
    {
        return ViewFactory::getView($name);
    }
}
