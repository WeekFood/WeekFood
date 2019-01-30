<?php

use core\MVC\Resource as Resource;

class UsuariosResource extends Resource {
    public function getUsuarioAction() {
        //TODO validar token
        $this->sql = 'SELECT nick, nombre FROM usuarios WHERE id = :idUsuario';
        $params = [
            "idUsuario" => $this->controller->getParam("idUsuario")
        ];
        $this->execSQL($params);
        $this->data[0]["foto"] = "perfil.png";
        $this->setData();
    }
}