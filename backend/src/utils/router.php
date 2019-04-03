<?php
class Router
{
    private $supportedHttpMethods = ['GET', 'POST'];
    private $controllers = ['GET' => [], 'POST' => []];

    /*
     * Méthode magique de PHP si on appelle une méthode qui n'est pas implémenté
     * cette méthode sera appelée. le premier params correspond au nom de la méthode
     * Le second aux params passés à celle-ci.
     *
     * Dans notre cas, le but est de mutualiser du code pour avoir le comportement suivant :
     * $router = new Router();
     * $router->GET(url, controller);
     * $router->POST(url, controller);
     *
     * Pour deux méthodes, ce n'est pas un gros gain,
     * mais si on veut supporter plus de méthode, il n'y a presque rien à faire.
     */
    public function __call($method, $args)
    {
        list($route, $controller) = $args;
        if (!in_array($name, $this->supportedHttpMethods)) {
            throw new Exception("$name is not a supported http method");
        }

        $this->controllers[$method][$route] = $controller;
    }

    /**
     * Retrouve un controller à partir du verbe http et de l'uri de la requête
     * Si méthode POST, on récupère et parse le body de la requête
     * et on le passe en param du controller.
     * Le controller doit renvoyer un objet qui sera sérialisé et renvoyé au client.
     */
    public function resolve()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $requestUri = $_SERVER['REQUEST_URI'];

        if (!isset($this->controllers[$requestMethod][$requestUri])) {
            return http_response_code(404);
        }

        $method = $this->controllers[$requestMethod][$requestUri];

        $methodParams = array();
        if ($requestMethod === 'POST') {
            $content = trim(file_get_contents("php://input"));
            $decoded = json_decode($content, true);
            if (is_null($decoded)) {
                return http_response_code(400);
            }

            $methodParams[] = $decoded;
        }
        $dataToSend = call_user_func_array($method, $methodParams);

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($dataToSend);
    }
}
