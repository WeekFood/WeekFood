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
        "API, Categorias (Principales)" => [
            "route" => "api/productos/categorias",
            "resource" => "productos",
            "action" => "getCategoriasPrincipalesTodosAction",
        ],
        "API, Categorias" => [
            "route" => "api/productos/categorias/:categoriaPrincipal",
            "resource" => "productos",
            "action" => "getCategoriasTodosAction",
        ],
        "API, Producto por categoria" => [
            "route" => "api/productos/categorias/:categoriaPrincipal/:categoriaEspecifica",
            "resource" => "productos",
            "action" => "getCategoriasAction",
        ]
    ]
];