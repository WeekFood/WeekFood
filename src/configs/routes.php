<?php

return [
    "get" => [
        "/" => [
            "route" => "/",
            "resource" => "cliente",
            "action" => "index",
        ],
        "API" => [
            "route" => "api",
            "resource" => "api",
            "action" => "error",
        ],
        "API, carrusel" => [
            "route" => "api/carrusel",
            "resource" => "productos",
            "action" => "getCarrusel",
        ],
        "API, menu" => [
            "route" => "api/menu",
            "resource" => "menu",
            "action" => "getTodos",
        ],
        "API, productos" => [
            "route" => "api/productos",
            "resource" => "productos",
            "action" => "getTodos",
        ],
        "API, Categorias Generales" => [
            "route" => "api/productos/categorias-generales",
            "resource" => "productos",
            "action" => "getCategoriasGeneralesTodosAction",
        ],
        "API, Categorias" => [
            "route" => "api/productos/categorias",
            "resource" => "productos",
            "action" => "getCategoriasTodosAction",
        ]
    ]
];