<?php

return [
    "get" => [
        "/" => array(
            "route" => "/",
            "resource" => "cliente",
            "action" => "index",
        ),
        "API" => array(
            "route" => "api",
            "resource" => "Api",
            "action" => "Api",
        ),
        "API, carrusel" => array(
            "route" => "api/carrusel",
            "resource" => "productos",
            "action" => "getCarrusel",
        ),
        "API, menu" => array(
            "route" => "api/menu",
            "resource" => "menu",
            "action" => "getTodos",
        ),
        "API, productos" => array(
            "route" => "api/productos",
            "resource" => "productos",
            "action" => "getTodos",
        ),
    ]
];