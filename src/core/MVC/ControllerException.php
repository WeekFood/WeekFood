<?php
namespace core\MVC;

class ControllerException extends \Exception{
    public function __construct($message, $code = 0, Exception $previous = null){
        header("Location: /");
        parent::__construct($message, $code, $previous);
    }
}