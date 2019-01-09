<?php

use core\MVC\Resource as Resource;

class ApiResource extends Resource {
    public function errorAction() {
        $this->setError(400, 'Petición incorrecta');
    }
    public function RedireccionAction(){
        if (isset($_SESSION["Redireccion"])){
            $this->data=["Redireccion"=>$_SESSION["Redireccion"]];
        }
        session_destroy();
        $this->setData();
    }
}