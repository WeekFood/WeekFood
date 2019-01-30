<?php

use core\MVC\Resource as Resource;

class UsuariosResource extends Resource {
    public function getUsuarioAction() {
        //TODO validar token
        $this->sql = 'SELECT * FROM productos WHERE FIND_IN_SET(:categoriaEspecifica,categoria)';
        $params = [
            "idUsuario" => $this->controller->getParam("idUsuario")
        ]
        
    }
}