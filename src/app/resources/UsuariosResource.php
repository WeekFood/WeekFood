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
        $this->sql = 'SELECT id, nick, nombre, apellidos, foto, sexo FROM usuarios WHERE id = :idUsuario';
        $params = [
            "idUsuario" => $this->controller->getParam("idUsuario")
        ];
        $this->execSQL($params);
        $this->setData();
    }

    public function getNivelPrivilegioAction() {
        $idUsuarioCookie = $this->auth->getLoggedId();
        if ($idUsuarioCookie == null) {
            $this->setError(401, 'NO_HAY_LOGIN');
            return;
        }
        /*
        $privilegioUsuarioCookie = $this->auth->getPrivilegeLevel($idUsuarioCookie);
        if ($privilegioUsuarioCookie > 0) {
            $this->data = ["nivelprivilegio",$this->auth->getPrivilegeLevel($this->controller->getParam("idUsuario"))];
        } else {
            $this->setError(401, 'NO_HAY_PERMISO');
            return;
        }
        */
        $this->nivelPrivilegioDelUsuario($idUsuarioCookie);
        // Este es el nivel que han en la tabla nivelesprivilegio, deberia cargarse dinamicamente o algo
        if ($this->data[0]['nivelprivilegio'] > 0) {
            $this->nivelPrivilegioDelUsuario($this->controller->getParam("idUsuario"));
        } else {
            $this->setError(401, 'NO_HAY_PERMISO');
            return;
        }
        $this->setData();
    }

    private function nivelPrivilegioDelUsuario($id) {
        $this->sql = 'SELECT nivelprivilegio FROM usuarios WHERE id = :idUsuario';
        $params = [
            "idUsuario" => $id
        ];
        $this->execSQL($params);
    }
}