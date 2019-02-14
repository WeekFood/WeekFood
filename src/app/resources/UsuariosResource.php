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
        $this->sql = 'SELECT id, nick, nombre, apellidos, foto, sexo, telefono, nacimiento FROM usuarios WHERE id = :idUsuario';
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

        $privilegioUsuarioCookie = $this->auth->getPrivilegeLevel($idUsuarioCookie);
        if ($privilegioUsuarioCookie > 0) {
            $this->data = [["nivelprivilegio" => $this->auth->getPrivilegeLevel($this->controller->getParam("idUsuario"))]];
        } else {
            $this->setError(401, 'NO_HAY_PERMISO');
            return;
        }
        $this->setData();
    }

    public function putUsuarioAction() {
        $json = file_get_contents('php://input');
        $usuario = json_decode($json, true);

        $idUsuario = $this->auth->getLoggedId();
        $idUsuarioUrl = $this->controller->getParam('idUsuario');
        if (
            $this->auth->getPrivilegeLevel($idUsuario) < 1
            && $idUsuarioUrl !== $idUsuario
        ) {
            $this->setError(401, 'NO_HAY_PERMISO');
            return;
        }
        if (substr($usuario['foto'], 0, 4) === "data") {
            $extensionImagen = explode(";",
                explode("/",
                    explode(",",
                        $usuario['foto']// data:image/jpeg;base64,[...]
                    )[0]// data:image/jpeg;base64
                )[1]// jpeg;base64,
            )[0]; // jpeg
            borrarImagenesDelUsuario($idUsuarioUrl);
            $nombreArchivoImagen = ROOT . DS . "cliente" . DS . "imagenes" . DS . "usuarios" . DS . $idUsuarioUrl . "." . $extensionImagen;
            //https://stackoverflow.com/questions/15153776/convert-base64-string-to-an-image-file
            $archivo = fopen($nombreArchivoImagen, 'wb');
            fwrite($archivo,
                base64_decode(
                    explode(",", $usuario['foto'])[1]
                )
            );
            fclose($archivo);

            $usuario['foto'] = $extensionImagen;

        } else {
            if (strlen($usuario['foto']) > 5) {
                if ($usuario['foto'] === "borrarImagen") {
                    $extensionImagen = null;
                } else {
                    $extensionImagen = explode(".", $usuario['foto'])[1];
                }
            } else {
                $extensionImagen = $usuario['foto'];
            }
        }

        if ($usuario["contraseña"] == ""){
            unset($usuario["contraseña"]);
        }
        $asignacionesSQL = [];
        $this->sql = 'UPDATE usuarios SET ';
        foreach ($usuario as $campo => $valor) {
            if ($valor == "") {
                $valor = null;
            }

            if ($campo == "fechaNacimiento") {
                $campo = "nacimiento";
            }
            
            if ($campo == "contraseña" && $valor != null) {
                $valor = password_hash($valor, PASSWORD_BCRYPT);
            }

            if ($campo == "foto") {
                $asignacionesSQL[$campo] = $extensionImagen;
            } else {
                $asignacionesSQL[($campo == "contraseña" ? "contra" : $campo)] = $valor;
            }

            $this->sql .= $campo . " = :" . ($campo == "contraseña" ? "contra" : $campo) . ", ";
        }
        $this->sql = rtrim($this->sql, ", ");
        $this->sql .= " WHERE id = :idUsuario";
        $asignacionesSQL['idUsuario'] = $idUsuarioUrl;
        $this->execSQL($asignacionesSQL);

        $this->data = $usuario;
        $this->setData();
    }

    public function getTodosAction() {
        $this->sql = 'SELECT
                        id,
                        nick,
                        nombre,
                        apellidos,
                        foto,
                        sexo,
                        telefono,
                        nacimiento,
                        nivelprivilegio
                    FROM
                        usuarios';
        $this->execSQL();
        $this->setData();
    }

    public function deleteUsuarioAction() {
        $this->sql = "DELETE FROM usuarios WHERE id = :idUsuario";
        $params = [
            "idUsuario" => $this->controller->getParam("idUsuario")
        ];
        $this->execSQL($params);
        http_response_code(204);
    }

    public function postUsuarioAction() {
        $json = file_get_contents('php://input');
        $usuario = json_decode($json, true);
        $this->sql = "INSERT INTO usuarios (
                                        nick,
                                        contraseña,
                                        nombre,
                                        apellidos,
                                        sexo,
                                        telefono,
                                        nacimiento,
                                        nivelprivilegio
                                ) VALUES (
                                        :nick,
                                        :contraseña,
                                        :nombre,
                                        :apellidos,
                                        :sexo,
                                        :telefono,
                                        :nacimiento,
                                        :nivelprivilegio
                                )";
    }

    private function borrarImagenesDelUsuario($idUsuario) {

        $imgExtensiones = [
            "png",
            "jpeg",
            "jpg",
            "gif",
            "svg"
        ];
        foreach ($imgExtensiones as $imgExten) {
            $imgABorrar = ROOT . DS . "cliente" . DS . "imagenes" . DS . "usuarios" . DS . $idUsuario . "." . $imgExten;
            if (file_exists($imgABorrar)) {
                unlink($imgABorrar);
            }
        }
    }
}
