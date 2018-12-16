<?php
    define('DS', DIRECTORY_SEPARATOR);
    define('ROOT', $_SERVER['DOCUMENT_ROOT']);

    return [
        'db' => [
            'name' => 'WeekFood',
            'host' => 'localhost',
            'user' => 'WeekFood',
            'password' => 'SQITBAxsMBPuQtaZ'
        ],
        'site' => [
            'coreMVC' => ROOT . DS . 'core' . DS . 'MVC' . DS,
            'configs' => ROOT . DS . 'configs' . DS,
            'controllers' => ROOT . DS . 'app' . DS . 'controllers' . DS, 
            'models' => ROOT . DS . 'app' . DS . 'models' . DS,
            'views' => ROOT . DS . 'app' . DS . 'views' . DS,
            'errorPage' => ROOT . DS . 'app' . DS . 'views' . DS . 'errorPage.php'
        ]
    ]; 