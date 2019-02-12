<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$config = require_once "./configs/config.php";

// CORS: permitir acceso desde otros dominios
// no sirve la wildcard si se manejan cookies, tiene que ser explicito
header('Access-Control-Allow-Origin: http://localhost:4200');
// CORS: permitir cookies
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // CORS: permitir cualquier header solicitado por OPTIONS -- https://stackoverflow.com/questions/13146892/cors-access-control-allow-headers-wildcard-being-ignored#comment21412367_13147554
    header('Access-Control-Allow-Headers: ' . getallheaders()['Access-Control-Request-Headers']);
    
    // CORS: permitir cualquier método solicitado por OPTIONS
    header('Access-Control-Allow-Methods: '. getallheaders()['Access-Control-Request-Method']);
    
    // CORS: devolver 200 (y no seguir con el enrutamiento) para peticiones OPTIONS
    http_response_code(200);
    exit();
}

try {
    $mysql = new PDO(
        "mysql:dbname=" . $config['db']['name'] . ";host=" . $config['db']['host'] . ";port=" . $config['db']['port'],
        $config['db']['user'],
        $config['db']['password']
    );
    $mysql->exec("set names utf8");
    $mysql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(["error" => "FALLO_CONECTAR_BD"]);

    exit();
}

require_once "./core/AutoLoad.php";

use \core\MVC\Controller;
use \core\Auth\Auth;

$globals = \core\Globals::getInstance();

$globals->set("db", $mysql);

//Utilizar el método set de $globals para añadir $config ($key será "config")
$globals->set("config", $config);
$globals->set("auth", new Auth($globals->get('db')));

session_start();

//Crear un nuevo objeto de tipo Controller
$controller = new Controller();

//Llamar al método run del objeto creado anteriormente
$controller->run();