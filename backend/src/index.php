<?php

/*
 * Ce fichier est le point d'entré unique à notre application
 * grâce au .htaccess toutes les requêtes sont redirigés vers ce fichier.
 * Cela facilite la maintenance de notre application.
 * C'est au router qu'appartient la charge d'executer le bon controller
 * selon la requête du client.
 */

error_reporting(E_ERROR | E_PARSE);

require_once('./config.php');
require_once('./utils/router.php');
require_once('./utils/db.php');
require_once('./models/user.php');

$router = new Router();

$router->POST('/user/register', function ($data) {
    // TODO form validation !
    $user = User::hydrate($data);
    $id = $user->save();
    if ($id) {
        return ['id' => $id];
    }
    http_response_code(400);
    exit;
});

$router->POST('/user/signin', function ($data) {
    $user = User::getUserByName($data['username']);
    if (!$user || !$user->checkPassword($data['password'])) {
        http_response_code(404);
        exit;
    }
    return ['id' => $user->id];
});

$router->resolve();
