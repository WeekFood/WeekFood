<?php

    define('DS', DIRECTORY_SEPARATOR);
    define('ROOT', $_SERVER['DOCUMENT_ROOT']);

    return [
        'db' => [
            'name' => 'WeekFood',
            'host' => '172.16.205.57',
            'port' => '3304',
            'user' => 'WeekFood',
            'password' => 'SQITBAxsMBPuQtaZ'
        ],
        'site' => [
            'coreMVC' => ROOT . DS . 'core' . DS . 'MVC' . DS,
            'configs' => ROOT . DS . 'configs' . DS,
            'resources' => ROOT . DS . 'app' . DS . 'resources' . DS
        ]
    ];