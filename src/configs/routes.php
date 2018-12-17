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
            "controller" => "principal",
            "action" => "api",
        ),
        /* //Para no discriminar si viene con ?x o ?x=y, buscar forma de hacerlo automatico
    "API parametro con valor" => array(
    "route" => "api?:parametro=:valor",
    "controller" => "principal",
    "action" => "api_param_valor",
    ),
    "API parametro sin valor" => array(
    "route" => "api?:parametro",
    "controller" => "principal",
    "action" => "api_param",
    ),*/
    ],
    "error" => "error.php",
];