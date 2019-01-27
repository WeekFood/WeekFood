<?php

use core\MVC\Resource as Resource;
use core\Globals;
use core\Auth;

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

        $this->auth->register($nick, $contraseña, $nombre, true);
    }

    public function postLoginAction() {
        $nick = $_POST['nick'];
        $contraseña = $_POST['contraseña'];
        $recuerdame = isset($_POST['recuerdame']);

        $this->auth->login($nick, $contraseña, $recuerdame);
    }

    public function getRenovarLoginAction() {
        $this->auth->renewLogin();
    }

    public function getLogoutAction() {
        $this->auth->logout();
    }
}