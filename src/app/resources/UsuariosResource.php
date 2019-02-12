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
    public function putUsuarioAction() {
        $json = file_get_contents('php://input');
        $usuario = json_decode($json, true);
        //Cojo la idUsuario para luego poder filtrarlo en el
        //update
        $idUsuario = $this->controller->getParam('id');
        $this->sql = 'UPDATE usuarios
                        SET
                            nombre = :nombre,
                            apellidos = :apellidos,
                            foto = :foto,
                            sexo = :sexo,
                            telefono = :telefono,
                            nacimiento = :nacimiento
                        WHERE id = :id';
        $this->execSQL([
            "nombre" => $usuario['nombre'],
            "apellidos" => $usuario['apellidos'],
            "foto" => $usuario['foto'],
            "sexo" => $usuario['sexo'],
            "telefono" => $usuario['telefono'],
            "nacimiento" => $usuario['nacimiento'],
            "id" => $idUsuario
        ]);
    }
}