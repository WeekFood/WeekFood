<?php

use core\MVC\Resource as Resource;
use core\Globals;
use core\Auth\Auth;
use core\Auth\UserNotFoundException;
use core\Auth\WrongPasswordException;
use core\Auth\NickTakenException;

class AuthResource extends Resource {
    /** @var Auth  */
    private $auth;

    public function __construct() {
        $this->auth = Globals::getInstance()->get('auth');
    }

    public function postRegistroAction() {
        $nick = $_POST['nick'];
        $nombre = $_POST['nombre'];
        $contraseña = $_POST['contraseña'];

        try {
            $this->auth->register($nick, $contraseña, $nombre, true);
        } catch (NickTakenException $e) {
            // no seria error... pero tampoco seria 200? hmm
            $this->setError(200, 'NICK_YA_EXISTE');
        }
    }

    public function postLoginAction() {
        $nick = $_POST['nick'];
        $contraseña = $_POST['contraseña'];
        $recuerdame = isset($_POST['recuerdame']);

        $usuario;

        try {
            $usuario = $this->auth->login($nick, $contraseña, $recuerdame);
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
}