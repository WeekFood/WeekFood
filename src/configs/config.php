<?php

    define('DS', DIRECTORY_SEPARATOR);
    define("ROOT", "/home/cesar/www/DWS/api");    
    //define("ROOT2", "http://api.test");    
    /*DEFINE ("VISTAS", ROOT . DS . "vistas");
    DEFINE ("CSS", ROOT2 . DS . "vistas" . DS . "css");
    DEFINE ("IMAGENES", ROOT2 . DS ."imagenes");
    DEFINE ("FICHEROS", ROOT2 . DS ."ficheros");
    DEFINE ("FICHEROS2", ROOT . DS ."ficheros");
    DEFINE ("AVATARES", ROOT2 . DS ."avatares");
    DEFINE ("AVATARES2", ROOT . DS ."avatares");
    DEFINE ("NOMBREAVATAR", "avatar");
    DEFINE ("EQUIPO", "Lakers");*/

    return array(
        "site" => array(
            "name" => "nba.com",
            "title"  => "LAKERS",
            "coreMVC" => ROOT . DS . "core" . DS . "MVC" . DS,
            "configs" => ROOT . DS . "configs" . DS,
            "resources" => ROOT . DS . "app" . DS . "resources" . DS, 
        )
    );