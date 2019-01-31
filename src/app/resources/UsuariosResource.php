<?php

use core\Auth\Auth as Auth;
use core\MVC\Resource as Resource;

class UsuariosResource extends Resource {
    /** @var Auth  */
    private $auth;

    public function __construct() {
        $this->auth = Globals::getInstance()->get('auth');
    }
    public function getUsuarioAction() {
        $idUsuario = $this->auth->getLoggedId();
        if ($idUsuario == null) {
            $this->setError(403, 'ACCESO PROHIBIDO');
        }
        $this->sql = 'SELECT nick, nombre FROM usuarios WHERE id = :idUsuario';
        $params = [
            "idUsuario" => $this->controller->getParam("idUsuario")
        ];
        $this->execSQL($params);
        $this->data[0]["foto"] = "perfil.png";
        $this->setData();
    }
}