<?php
namespace core\MVC;

class ControllerException extends \Exception{
    public function __construct($message, $code = 0, Exception $previous = null){
        setcookie("Redirect",$_SERVER["REQUEST_URI"]);
        header("Location: /");
    }
}