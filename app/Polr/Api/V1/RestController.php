<?php namespace App\Polr\Api\V1;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Polr\Api\V1\ViewFactory;

class RestController extends Controller
{
    const RESPONSE_OK                 = 200;
    const RESPONSE_CREATED            = 201;
    const RESPONSE_NOT_MODIFIED       = 304;
    const RESPONSE_BAD_REQUEST        = 400;
    const RESPONSE_UNAUTHORIZED       = 401;
    const RESPONSE_FORBIDDEN          = 403;
    const RESPONSE_NOT_FOUND          = 404;
    const RESPONSE_METHOD_NOT_ALLOWED = 405;
    const RESPONSE_INTERNAL_ERROR     = 500;

    protected static $apiName = null;
    protected static $apiId = null;
    protected $resourceModel = null;
    protected $resourceView = null;

    protected $query = null;

    /**
     * Relationships are loaded by default
     * @var array
     */
    protected $defaultRelationships = [];

    /**
     * Allowed relationships when using {with} query string
     *
     * It's possible to use anonymous functions for additional query manipulation
     * i.e.: ['options'=>function($query){return $query->orderBy('id')}]
     * check eloquent ORM documentation for more details
     *
     * @var array
     */
    protected $allowedRelationships = [];


    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $model = $this->resourceModel;
        $this->query = $model::query();

        if ($this->getParam('sort')) {
            $this->query->orderBy($this->getParam('sort'), $this->getParam('sort_direction', 'ASC'));
        }
        if ($search = $this->getParam('search')) {
            $this->query->where($this->getParam('search_column', 'name'), 'like', "%{$search}%");
        }

        $this->addRelationships();

        $result = $this->query->paginate((int)$this->getParam('limit', 25))->toArray();

        $result['data'] = $this->renderList($result['data']);
        return \Response::json($result);
    }


    /**
     * Display the specified resource.
     * @param  int $idq
     * @return Response
     */
    public function show($id)
    {
        $model = $this->resourceModel;
        $this->query = $model::query();

        $this->addRelationships();

        if (($item = $this->query->find($id)) == null) {
            return $this->error('Resource not found', static::RESPONSE_BAD_REQUEST);
        }
        $data = $item->toArray();
        $data = $this->render($data);
        return \Response::json($data);
    }







    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        // parse parameters
        $parameters = $this->getIncomingParameters();

        $model = $this->resourceModel;
        $modelName = array_slice(explode('\\', $model), -1)[0];

        $item = new $model;

        foreach ($parameters as $field => $value) {
            $item->{$field} = $value;
        }

        try {
            $created = $item->save();
        } catch (ModelException $e) {
            return $this->error(
                $e->getMessage(),
                Services_Api_Response::BAD_REQUEST
            );
        }

        return $this->success([
            'message' => "{$modelName} created",
            'id' => $item->{$item->getKeyName()},
        ]);
    }




    /**
     * The update action handles PUT requests and receives an 'id' parameter; it
     * should update the server resource state of the resource identified by
     * the 'id' value.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        // parse parameters
        $parameters = $this->getIncomingParameters();

        $model = $this->resourceModel;
        $modelName = array_slice(explode('\\', $model), -1)[0];
        $this->query = $model::query();

        $item = $this->query->find($id);

        foreach ($parameters as $field => $value) {
            $item->{$field} = $value;
        }

        try {
            $updated = $item->save();
        } catch (ModelException $e) {
            return $this->error(
                $e->getMessage(),
                Services_Api_Response::BAD_REQUEST
            );
        }

        return $this->success([
            'message' => "{$modelName} updated",
            'id' => $item->{$item->getKeyName()},
        ]);
    }






    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
        echo 'delete2';
        exit;
    }





    protected function success($message)
    {
        return \Response::json(
            $message,
            static::RESPONSE_OK
        );
    }



    protected function error($message, $code)
    {
        $reflector = new \ReflectionClass('Response');
// echo $reflector->getFileName();die;

        throw new ApiException($message, $code);
        // return \Response::json(
        //     [
        //         'error' => $message,
        //         'code' => $code,
        //     ],
        //     $code
        // );
    }


    protected function getParam($paramName, $defaultValue = null)
    {
        return \Input::get($paramName, $defaultValue);
    }

    /**
     * Render list of items under view
     * @param  array $items  Items to render
     * @param  mixed $view   View name or instance to use
     * @return array
     */
    protected function renderList($data, $view = null)
    {
        $view = $this->getView($view);
        foreach ($data as &$item) {
            $item = $view->render($item);
        }
        return $data;
    }


    /**
     * Get view
     * @param  mixed $view  View name or instance
     * @return View
     */
    protected function getView($view = null)
    {
        $view = $view ?: $this->resourceView;
        if (empty($view)) {
            $view = ViewFactory::getView();
        }
        elseif (is_string($view)) {
            $view = ViewFactory::getView($view);
        }
        return $view;
    }


    /**
     * Render single item under view
     * @param array $items Item to render
     * @param mixed $view View name or instance to use
     * @return array Rendered item
     */
    protected function render($item, $view = null)
    {
        return $this->renderList([ $item ], $view)[0];
    }


    /**
     * Parses and returns a comma separated request parameter.
     *
     * @param string $param_name
     * @param mixed  $default
     * @return array
     */
    public function getCommaSeparatedParam($param_name, $default = '')
    {
        return array_unique(array_filter(
            explode(',', str_replace(' ', '', trim($this->getParam($param_name, $default))))
        ));
    }


    /**
     * Add relationships for view
     * @param bool $eagerLoading Lazy load or not
     * @return void
     */
    protected function addRelationships($eagerLoading = true)
    {
        // Look for relationships
        $relationships = $this->getCommaSeparatedParam('with');

        $allowedRelationships = [];
        $anonymousFuncs = [];
        foreach ($this->allowedRelationships as $key => $value) {
            if ($value instanceof Closure) {
                $allowedRelationships[] = $key;
                $anonymousFuncs[] = $key;
            } else {
                $allowedRelationships[] = $value;
            }
        }

        foreach ($relationships as $relationship) {
            if (in_array($relationship, $allowedRelationships)) {
                if (in_array($relationship, $anonymousFuncs)) {
                    $this->query->{$eagerLoading ? 'with' : 'load'}([
                        $relationship => $this->allowedRelationships[$relationship]
                    ]);
                } else {
                    $this->query->{$eagerLoading ? 'with' : 'load'}($relationship);
                }
            } else {
                return $this->error(
                    "{$relationship} relationship not found",
                    static::RESPONSE_BAD_REQUEST
                );
            }
        }

        $this->query->{$eagerLoading ? 'with' : 'load'}($this->defaultRelationships);
    }



    /**
     * Retrieves parsed payload. If $this->_cms_crud_fields exists, it will
     * be used as a filter on the parameters.
     *
     * Used on POST and PUT request
     *
     * @return array
     */
    protected function getIncomingParameters()
    {
        $request = \Input::json();

        try {
            $params = $request->all();
            return $params;
        } catch (Exception $e) {
            return $this->error($e->getMessage(), $e->getCode());
        }
    }
}
