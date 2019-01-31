<?php

use core\Globals as Globals;
use core\MVC\Resource as Resource;

class UsuariosResource extends Resource {
    /** @var Auth  */
    private $auth;

    public function __construct() {
        parent::__construct();
        $this->auth = Globals::getInstance()->get('auth');
    }
    public function getUsuarioAction() {
        $idUsuario = $this->auth->getLoggedId();
        if ($idUsuario == null) {
            $this->setError(401, 'NO_HAY_LOGIN');
            return;
        }
        // TODO nivel privilegios
        $this->sql = 'SELECT id, nick, nombre, apellidos, foto FROM usuarios WHERE id = :idUsuario';
        $params = [
            "idUsuario" => $this->controller->getParam("idUsuario")
        ];
        $this->execSQL($params);
        $this->data[0]["foto"] = "perfil.png";
        $this->setData();
    }
}