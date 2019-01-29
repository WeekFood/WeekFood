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
            // TODO: validar nombre cuando el frontend lo tenga en cuenta
            $this->setError(400, 'FALTAN_CAMPOS');
            return;
        }

        if (empty($_POST['nick']) || empty($_POST['contraseña'])) {
            // TODO: validar nombre cuando el frontend lo tenga en cuenta
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
        $nombre = $_POST['nombre'];
        $contraseña = $_POST['contraseña'];

        try {
            $usuario = $this->auth->register($nick, $contraseña, $nombre, true);

            $this->data = [
                "nick" => $usuario['nick'],
                "nombre" => $usuario['nombre']
            ];

            header('HTTP/1.1 201 Created', true, 201);
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
        $recuerdame = isset($_POST['recuerdame']);

        $usuario;

        try {
            $usuario = $this->auth->login($nick, $contraseña, $recuerdame);

            $this->data = [
                "nick" => $usuario['nick'],
                "nombre" => $usuario['nombre']
            ];

            $this->setData();
        } catch (UserNotFoundException $e) {
            $this->setError(401, 'USUARIO_NO_ENCONTRADO');
        } catch (WrongPasswordException $e) {
            $this->setError(401, 'CONTRASEÑA_INCORRECTA');
        }
    }

    public function getRenovarLoginAction() {
        $this->auth->renewLogin();
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