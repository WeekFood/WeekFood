<?php
namespace core;

use core\Globals as Globals;

class Auth {
    const ERR_NO_TOKEN = 'ERR_NO_TOKEN';
    const ERR_ROLE_FORBIDDEN = 'ERR_ROLE_FORBIDDEN';
    const ERR_ACCESS_FORBIDDEN = 'ERR_ACCESS_FORBIDDEN';

    const RESOURCE_CARRITO_ID = 'RESOURCE_CARRITO_ID';

    private $db = null;

    public function __construct($db) {
        $this->db = $db;
    }

    public function login($user, $password, $rememberMe) {
        // TODO
    }

    public function isAuthenticated(): \boolean {
        // TODO
        return false;
    }

    public function hasPrivilegeLvl(int $lvl): \boolean {
        // TODO
        return false;
    }

    public function canAccess(string $resourceConst, $credentials): \boolean {
        // TODO
        return false;
    }

    public function sendError(string $errorConst) {
        switch ($type) {
            case (Auth::ERR_NO_TOKEN):
                http_response_code(401);
                break;
            case (Auth::ERR_ROLE_FORBIDDEN):
            case (Auth::ERR_ACCESS_FORBIDDEN):
                http_response_code(403);
                break;
            default:
                http_response_code(500);
        }
    }
}