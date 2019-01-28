<?php
namespace core\Auth;

/**
 * Based on https://stackoverflow.com/a/17266448/3499595 & https://github.com/delight-im/PHP-Auth/
 */
class Auth {
    const ERR_NO_TOKEN = 'ERR_NO_TOKEN';
    const ERR_ROLE_FORBIDDEN = 'ERR_ROLE_FORBIDDEN';
    const ERR_ACCESS_FORBIDDEN = 'ERR_ACCESS_FORBIDDEN';
    const ERR_LOGIN_USER_NOT_FOUND = 'ERR_LOGIN_USER_NOT_FOUND';
    const ERR_LOGIN_WRONG_PASSWORD = 'ERR_LOGIN_WRONG_PASSWORD';
    const ERR_RENEW_LOGIN_INVALID_SIGNATURE = 'ERR_RENEW_LOGIN_INVALID_SIGNATURE';
    const ERR_LOGOUT_NO_LOGIN = 'ERR_LOGOUT_NO_LOGIN';

    const RESOURCE_CARRITO_ID = 'RESOURCE_CARRITO_ID';

    private const SECRET_KEY = "F4Ev-17IbLRcEkwr2p8NRL62bys5fo6AqJrfWZwd5wBUBqDdDueKZz4VlJiWaD1TOXkmNtrU2gCmhNeZvimikm-3yI293zaufdnSoJ0isJ_i1SDmR8GeWVTVkBIPRewP4yBlb2uHbm1Uxppd0wkFau8iNmm5tqQppG0O5Rij5oojForsrvT8ahB9YYkX3fbM5u0RAW4AHbXqrN62xlN17FuXzZUtknI_W_HSOnnrQH5Rj0ZaT2GzRdR9PyaoXfLEduCq_2NowAxIzznsn-OnTFf7VuSrqmj5z1cvO_qyGM0sDNJiUQjKV-R-FQYK9yBkWsWclncU7CVN8uz44CSQng";

    private const COOKIE_LIFETIME_SEC = 60 * 60 * 24 * 7; /* 7 days */
    private const COOKIE_NAME_TOKEN = 'token';
    private const COOKIE_NAME_REMEMBER_ME = 'recuerdame';

    private $db = null;

    public function __construct($db) {
        $this->db = $db;
    }

    public function register(string $nick, string $password, string $name, bool $rememberMe = false) {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        if ($this->nickTaken($nick)) {
            throw new NickTakenException();
        }

        $sql = 'INSERT INTO
                    usuarios (nick, contraseña, nombre)
                VALUES (
                    :nick,
                    :password,
                    :name
                );';

        $ps = $this->db->prepare($sql);
        $ps->bindParam(':nick', $nick);
        $ps->bindParam(':password', $hashedPassword);
        $ps->bindParam(':name', $name);

        $ps->execute();

        $this->login($nick, $password, $rememberMe);
    }

    public function login(string $nick, string $password, bool $rememberMe = false): array {
        $sql = 'SELECT * FROM usuarios WHERE nick = :nick LIMIT 1;';

        $ps = $this->db->prepare($sql);
        $ps->bindParam(':nick', $nick);
        $ps->execute();

        $user = $ps->fetch(\PDO::FETCH_ASSOC);

        if (!empty($user)) {
            $dbHashedPassword = $user['contraseña'];

            if (password_verify($password, $dbHashedPassword)) {
                $this->setCookies($user['id'], $rememberMe);
                return $user;
            } else {
                $this->sendError(self::ERR_LOGIN_WRONG_PASSWORD);
                throw new WrongPasswordException();
            }
        } else {
            $this->sendError(self::ERR_LOGIN_USER_NOT_FOUND);
            throw new UserNotFoundException();
        }
    }

    private function setCookies(string $userId, bool $rememberMe = false): bool {
        $this->setSession($userId);

        if ($rememberMe) {
            $token = $this->generateRandomToken();

            $body = $userId . '.' . $token;
            $bodySignedHash = hash_hmac('sha256', $body, self::SECRET_KEY);

            $cookie = $body . '.' . $bodySignedHash;

            setcookie(
                self::COOKIE_NAME_TOKEN,
                $cookie,
                time() + self::COOKIE_LIFETIME_SEC,
                '/'
            );

            setcookie(
                self::COOKIE_NAME_REMEMBER_ME,
                '1', // al parecer es necesario algun valor, no puede estar vacio, sino es como si se borrase (segun Postman, por lo menos)
                time() + self::COOKIE_LIFETIME_SEC,
                '/'
            );

            $_SESSION['recuerdame'] = true;
        }

        return true;
    }

    public function renewLogin(): bool {
        if (isset($_COOKIE[self::COOKIE_NAME_TOKEN])) {
            list($userId, $token, $signedHash) = explode('.', $_COOKIE[self::COOKIE_NAME_TOKEN]);

            if (!hash_equals(hash_hmac('sha256', $userId . '.' . $token, self::SECRET_KEY), $signedHash)) {
                $this->sendError(self::ERR_RESUME_LOGIN_INVALID_SIGNATURE);
                return false;
            }

            $this->setCookies($userId, isset($_COOKIE[self::COOKIE_NAME_REMEMBER_ME]));
            return true;
        } else {
            $this->sendError(self::ERR_NO_TOKEN);
            return false;
        }
    }

    public function logout(): bool {
        if ($this->isLoggedIn()) {
            session_destroy();
            if (isset($_COOKIE[self::COOKIE_NAME_TOKEN])) {
                setcookie(self::COOKIE_NAME_TOKEN, '', 0);
                setcookie(self::COOKIE_NAME_REMEMBER_ME, '', 0);
            }
        } else {
            $this->sendError(self::ERR_LOGOUT_NO_LOGIN);
            return false;
        }

        return true;
    }

    private function setSession(string $userId): bool {
        $_SESSION['logueado'] = true;
        $_SESSION['idUsuario'] = $userId;
        // TODO: nivel de privilegio ?

        return true;
    }

    public function nickTaken(string $nick): bool {
        $sql = 'SELECT nick FROM usuarios WHERE nick = :nick';
        $ps = $this->db->prepare($sql);
        $ps->bindParam(':nick', $nick);
        $ps->execute();

        $userWithSameNick = $ps->fetch(\PDO::FETCH_ASSOC);

        return !empty($userWithSameNick);
    }

    private function generateRandomToken(): string {
        return bin2hex(random_bytes(32));
    }

    public function isLoggedIn(): bool {
        return session_status() !== PHP_SESSION_NONE
                && isset($_SESSION['logueado'])
                && $_SESSION['logueado']
                && isset($_SESSION['idUsuario'])
                && $_SESSION['idUsuario'];
    }

    public function hasPrivilegeLvl(int $lvl): bool {
        // TODO
        return false;
    }

    public function canAccess(string $resourceConst, array $credentials = []): bool {
        // TODO
        return false;
    }

    public function sendError(string $errorConst) {
        switch ($errorConst) {
            case (self::ERR_NO_TOKEN):
            case (self::ERR_LOGIN_USER_NOT_FOUND):
            case (self::ERR_LOGIN_WRONG_PASSWORD):
            case (self::ERR_RENEW_LOGIN_INVALID_SIGNATURE):
            case (self::ERR_LOGOUT_NO_LOGIN):
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
