<?php

return [
    "routes" => [

        "/" => array(
            "route" => "/",
            "controller" => "principal",
            "action" => "index",
        ),
        "API" => array(
            "route" => "api",
            "controller" => "Api",
            "action" => "Api",
        ),
        "API, carrusel" => array(
            "route" => "api/carrusel",
            "controller" => "carrusel",
            "action" => "carrusel",
        ),
        "API, menu" => array(
            "route" => "api/menu",
            "controller" => "menu",
            "action" => "menu",
        ),
        "API, productos" => array(
            "route" => "api/productos",
            "controller" => "productos",
            "action" => "productos",
        ),
        "API, portada" => array(
            "route" => "api/portada",
            "controller" => "portada",
            "action" => "portada",
        ),
    ],
    "error" => "error.php",
];