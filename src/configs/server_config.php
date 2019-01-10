<?php

    define('DS', DIRECTORY_SEPARATOR);
    define('ROOT', $_SERVER['DOCUMENT_ROOT']);

    return [
        'db' => [
            'name' => 'WeekFood',
            'host' => 'localhost',
            'port' => '3331',
            'user' => 'WeekFood',
            'password' => 'SQITBAxsMBPuQtaZ'
        ],
        'site' => [
            'coreMVC' => ROOT . DS . 'core' . DS . 'MVC' . DS,
            'configs' => ROOT . DS . 'configs' . DS,
            'resources' => ROOT . DS . 'app' . DS . 'resources' . DS
        ]
    ];