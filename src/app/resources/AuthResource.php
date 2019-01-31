<?php
use core\Auth\Auth;
use core\Auth\NickTakenException;
use core\Auth\UserNotFoundException;
use core\Auth\WrongPasswordException;
use core\Globals;
use core\MVC\Resource;

class AuthResource extends Resource {
    /** @var Auth  */
    private $auth;

    public function __construct() {
        $this->auth = Globals::getInstance()->get('auth');
    }

    public function postRegistroAction() {
        $LONGITUD_MINIMA_NICK = 4;
        $LONGITUD_MINIMA_CONTRASEÑA = 6;

        if (!isset($_POST['nick']) || !isset($_POST['contraseña'])) {
            $this->setError(400, 'FALTAN_CAMPOS');
            return;
        }

        if (empty($_POST['nick']) || empty($_POST['contraseña'])) {
            $this->setError(400, 'CAMPOS_VACIOS');
            return;
        }

        if (
            strlen($_POST['nick']) < $LONGITUD_MINIMA_NICK
            ||
            strlen($_POST['contraseña']) < $LONGITUD_MINIMA_CONTRASEÑA
        ) {
            $this->setError(400, 'CAMPOS_INVALIDOS');
            return;
        }

        $nick = $_POST['nick'];
        $nombre = $nick;
        $contraseña = $_POST['contraseña'];

        try {
            $usuario = $this->auth->register($nick, $contraseña, $nombre, true);

            $this->data = [
                "id" => $usuario['id'],
                "nick" => $usuario['nick'],
                "nombre" => $usuario['nombre'],
                "apellidos" => $usuario['apellidos'],
                "foto" => $usuario['foto']
            ];

            http_response_code(201);
            $this->setData();
        } catch (NickTakenException $e) {
            $this->setError(409, 'USUARIO_YA_EXISTE');
        }
    }

    public function postLoginAction() {
        if (!isset($_POST['nick']) || !isset($_POST['contraseña'])) {
            $this->setError(400, 'FALTAN_CAMPOS');
            return;
        }

        if (empty($_POST['nick']) || empty($_POST['contraseña'])) {
            $this->setError(400, 'CAMPOS_VACIOS');
            return;
        }

        $nick = $_POST['nick'];
        $contraseña = $_POST['contraseña'];

        $usuario;

        try {
            $usuario = $this->auth->login($nick, $contraseña);

            $this->data = [
                "id" => $usuario['id'],
                "nick" => $usuario['nick'],
                "nombre" => $usuario['nombre'],
                "apellidos" => $usuario['apellidos'],
                "foto" => $usuario['foto']
            ];

            $this->setData();
        } catch (UserNotFoundException $e) {
            $this->setError(401, 'USUARIO_NO_ENCONTRADO');
        } catch (WrongPasswordException $e) {
            $this->setError(401, 'CONTRASEÑA_INCORRECTA');
        }
    }

    public function getRenovarLoginAction() {
        if ($this->auth->renewLogin()) {
            http_response_code(204);
        };
    }

    public function getLogoutAction() {
        $this->auth->logout();
    }

    public function postUsuarioYaExisteAction() {
        if (!isset($_POST['nick'])) {
            $this->setError(400, 'FALTAN_CAMPOS');
            return;
        }

        $this->data = [
            "nick" => $_POST['nick'],
            "yaExiste" => $this->auth->nickTaken($_POST['nick'])
        ];

        $this->setData();
    }
}