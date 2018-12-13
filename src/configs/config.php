<?php

    define('DS', DIRECTORY_SEPARATOR);
    define("ROOT", "/home/cesar/www/DWS/proyecto");    
    define("ROOT2", "http://proyecto.test");    
    DEFINE ("VISTAS", ROOT . DS . "vistas");
    DEFINE ("CSS", ROOT2 . DS . "vistas" . DS . "css");
    DEFINE ("IMAGENES", ROOT2 . DS ."imagenes");
    DEFINE ("FICHEROS", ROOT2 . DS ."ficheros");
    DEFINE ("FICHEROS2", ROOT . DS ."ficheros");
    DEFINE ("AVATARES", ROOT2 . DS ."avatares");
    DEFINE ("AVATARES2", ROOT . DS ."avatares");
    DEFINE ("NOMBREAVATAR", "avatar");
    DEFINE ("EQUIPO", "Lakers");

    return array(
        "site" => array(
            "name" => "nba.com",
            "title"  => "LAKERS",
            "coreMVC" => ROOT . DS . "core" . DS . "MVC" . DS,
            "style"  => ROOT . DS . "htdocs" . DS . "css" . DS,
            "configs" => ROOT . DS . "configs" . DS,
            "controllers" => ROOT . DS . "app" . DS . "controllers" . DS, 
            "models" => ROOT . DS . "app" . DS . "models" . DS,
            "views" => ROOT . DS . "app" . DS . "views" . DS,
            "errorPage" => ROOT . DS . "app" . DS . "views" . DS . "errorPage.php"
        )
    );