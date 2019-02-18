<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', $_SERVER['DOCUMENT_ROOT']);

return [
    'db' => [
        'name' => 'weekfood',
        'host' => 'weekfood_db',
        'port' => '3306',
        'user' => 'WeekFood',
        'password' => 'SQITBAxsMBPuQtaZ'
    ],
    'site' => [
        'coreMVC' => ROOT . DS . 'core' . DS . 'MVC' . DS,
        'configs' => ROOT . DS . 'configs' . DS,
        'resources' => ROOT . DS . 'app' . DS . 'resources' . DS,
        'imagenes usuarios' => ROOT . DS . 'imagenesUsuarios' . DS
    ]
];
