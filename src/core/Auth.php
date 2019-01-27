<?php
namespace core;

class Auth {
    const ERR_NO_TOKEN = 'ERR_NO_TOKEN';
    const ERR_ROLE_FORBIDDEN = 'ERR_ROLE_FORBIDDEN';
    const ERR_ACCESS_FORBIDDEN = 'ERR_ACCESS_FORBIDDEN';
    const ERR_LOGIN_USER_NOT_FOUND = 'ERR_LOGIN_USER_NOT_FOUND';

    const RESOURCE_CARRITO_ID = 'RESOURCE_CARRITO_ID';

    private const PRIVATE_KEY = "F4Ev-17IbLRcEkwr2p8NRL62bys5fo6AqJrfWZwd5wBUBqDdDueKZz4VlJiWaD1TOXkmNtrU2gCmhNeZvimikm-3yI293zaufdnSoJ0isJ_i1SDmR8GeWVTVkBIPRewP4yBlb2uHbm1Uxppd0wkFau8iNmm5tqQppG0O5Rij5oojForsrvT8ahB9YYkX3fbM5u0RAW4AHbXqrN62xlN17FuXzZUtknI_W_HSOnnrQH5Rj0ZaT2GzRdR9PyaoXfLEduCq_2NowAxIzznsn-OnTFf7VuSrqmj5z1cvO_qyGM0sDNJiUQjKV-R-FQYK9yBkWsWclncU7CVN8uz44CSQng";

    private const COOKIE_LIFETIME_SEC = 60 * 60 * 24 * 7; /* 7 days */
    private const COOKIE_NAME_TOKEN = 'token';
    private const COOKIE_NAME_REMEMBER_ME = 'recuerdame';

    private $db = null;

    public function __construct($db) {
        $this->db = $db;
    }

    public function register(string $nick, string $password, string $name, bool $rememberMe = false) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $sql = 'INSERT INTO
                    usuarios (nick, contraseña, nombre)
                VALUES (
                    :nick,
                    :contraseña,
                    :nombre
                );';

        $ps = $this->db->prepare($sql);
        $ps->bindParam(':nick', $nick);
        $ps->bindParam(':contraseña', $password);
        $ps->bindParam(':nombre', $name);

        $ps->execute();

        // TODO: if insertado con exito ?
        // TODO: throw error si ya existe

        $this->login($nick, $password, $rememberMe);
    }

    public function login(string $nick, string $password, bool $rememberMe = false): bool {
        $sql = 'SELECT * FROM usuarios WHERE nick = :nick LIMIT 1;';

        $ps = $this->db->prepare($sql);
        $ps->bindParam(':nick', $nick);
        $ps->execute();

        $result = $ps->fetch();

        if (!empty($result)) {
            $dbHashedPassword = $result['contraseña'];
            
            if (password_verify($password, $dbHashedPassword)) {
                return $this->setCookies($result['id'], true);
            }
        } else {
            $this->sendError(self::ERR_LOGIN_USER_NOT_FOUND);
            return false;
        }
    }

    private function setCookies(string $userId, bool $rememberMe): bool {
        session_start();

        // TODO: asignar a SESSION el id de usuario y ¿ nivel de privilegio ?

        if ($rememberMe) {
            $token = $this->generateRandomToken();

            $body = $userId . ':' . $token;
            $bodySignedHash = hash_hmac('sha256', $body, self::PRIVATE_KEY);

            $cookie = $boby . ':' . $bodySignedHash;

            /* TODO: movida dominio localhost [1] */
            // https://stackoverflow.com/a/1188145/3499595
            $domain = ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false;

            setcookie(
                self::COOKIE_NAME_TOKEN,
                $cookie,
                time() + self::COOKIE_LIFETIME_SEC
                /* TODO: movida dominio localhost [2] necesario para asignar httponly */
            );

            setcookie(
                self::COOKIE_NAME_REMEMBER_ME,
                '',
                time() + self::COOKIE_LIFETIME_SEC
            );
        }

        return true;
    }

    private function generateRandomToken(): string {
        return bin2hex(random_bytes(32));
    }

    public function isAuthenticated(): bool {
        // TODO
        return false;
    }

    public function hasPrivilegeLvl(int $lvl): bool {
        // TODO
        return false;
    }

    public function canAccess(string $resourceConst, $credentials): bool {
        // TODO
        return false;
    }

    public function sendError(string $errorConst) {
        switch ($type) {
        case (self::ERR_NO_TOKEN):
        case (self::ERR_LOGIN_USER_NOT_FOUND):
            http_response_code(401);
            break;
        case (self::ERR_ROLE_FORBIDDEN):
        case (self::ERR_ACCESS_FORBIDDEN):
            http_response_code(403);
            break;
        default:
            http_response_code(500);
        }
    }
}