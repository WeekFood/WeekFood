<?php

use core\Globals as Globals;
use core\MVC\Resource as Resource;

class CarritosResource extends Resource {
    /** @var Auth  */
    private $auth;

    public function __construct() {
        parent::__construct();
        $this->auth = Globals::getInstance()->get('auth');
    }
    public function getCarritoAction() {
        $idUsuarioToken = $this->auth->getLoggedId();
        if ($idUsuarioToken == null) {
            $this->setError(401, 'NO_HAY_LOGIN');
            return;
        }
        $this->sql = "SELECT
                        carritos.id,
                        carritos.fecha,
                        articulosencarritos.idArticulo,
                        articulosencarritos.cantidad
                      FROM
                        carritos JOIN articulosencarritos ON
                        articulosencarritos.idCarrito = carritos.id
                      WHERE carritos.idUsuario = :idUsuario";
        $params = [
            "idUsuario" => $this->controller->getParam("idUsuario")
        ];
        if ($idUsuarioToken != $params["idUsuario"]) {
            $this->setError(403, 'ACCESO_DENEGADO');
        }
        try {
            $this->execSQL($params);
        } catch (Exception $e) {
            $this->setError(409, 'USUARIO_INEXISTENTE');
            die();
        }
        $carrito = [];
        if ($this->data != NULL) {
            $carrito["id"] = $this->data[0]["id"];
            $carrito["fecha"] = $this->data[0]["fecha"];
            $carrito["articulos"] = [];
            foreach ($this->data as $linea) {
                $articulo = ["id" => $linea["idArticulo"], "cantidad" => $linea["cantidad"]];
                array_push($carrito["articulos"], $articulo);
            }
        }
        if (count($carrito) > 0) {
            $carrito = [$carrito];
        }
        $this->data = $carrito;
        $this->setData();
    }

    public function getCarritosAction() {
        $this->sql = 'SELECT * FROM carritos';
        $this->execSQL();
        $this->setData();
    }

    public function postCarritoAction() {

        $json = file_get_contents('php://input');
        $carrito = json_decode($json, true);
        if (!array_key_exists("fecha", $carrito)) {
            $this->setError(400, 'FALTA_FECHA');
            die();
        } else if (strlen($carrito["fecha"]) != 19) {
            $this->setError(400, 'FECHA_INCORRECTA');
            die();
        }

        // flag para NO CRUD
        if (isset($carrito['articulos'])) {
            foreach ($carrito["articulos"] as $articulo) {
                if ((!array_key_exists("id", $articulo)) || (!array_key_exists("cantidad", $articulo))) {
                    $this->setError(400, 'PETICION_INCORRECTA');
                    die();
                }
            }
        }

        // flag para NO CRUD
        if (!isset($carrito['idUsuario'])) {
            $params = [
                "idUsuario" => $this->auth->getLoggedId(),
                "fecha" => $carrito["fecha"]
            ];
        } else {
            $params = [
                "idUsuario" => $carrito["idUsuario"],
                "fecha" => $carrito["fecha"]
            ];
        }

        $this->sql = "INSERT INTO carritos (idUsuario, fecha) VALUES (:idUsuario, :fecha)";

        try {
            $this->execSQL($params);
        } catch (PDOException $e) {
            switch ($e->errorInfo[1]) {
                case 1452: // Cannot add or update a child row: a foreign key constraint fails
                    $this->setError(409, 'USUARIO_INEXISTENTE');
                    break;
                default:
                    $this->setError(500, 'ERROR_PDO');
            }

            exit();
        }

        $carrito["id"] = $this->data;

        // flag para NO CRUD
        if (isset($carrito['articulos'])) {
            foreach ($carrito["articulos"] as $articulo) {
                $this->sql = "INSERT INTO articulosencarritos VALUES (:idCarrito, :idArticulo, :cantidad)";
                $params = [
                    "idCarrito" => $carrito["id"],
                    "idArticulo" => $articulo["id"],
                    "cantidad" => $articulo["cantidad"]
                ];
                try {
                    $this->execSQL($params);
                } catch (Exception $e) {
                    $this->setError(409, 'CARRITO_Y_O_ARTICULO_INEXISTENTE');
                    die();
                }
            }
        }

        $this->data = $carrito;
        $this->setData();
    }

    public function putCarritoAction() {
        $json = file_get_contents('php://input');
        $carrito = json_decode($json, true);
        if (!array_key_exists("id", $carrito)) {
            $this->setError(400, 'PETICION_INCORRECTA');
            die();
        }
        if ($this->controller->getParam("id") != $carrito["id"]) {
            $this->setError(400, 'PETICION_INCORRECTA');
            die();
        }
        if (!array_key_exists("fecha", $carrito)) {
            $this->setError(400, 'FALTA_FECHA');
            die();
        } else if (strlen($carrito["fecha"]) != 19) {
            $this->setError(400, 'FECHA_INCORRECTA');
            die();

        }

        // flag para NO CRUD
        if (isset($carrito['articulos'])) {
            foreach ($carrito["articulos"] as $articulo) {
                if ((!array_key_exists("id", $articulo)) || (!array_key_exists("cantidad", $articulo))) {
                    $this->setError(400, 'PETICION_INCORRECTA');
                    die();
                }
            }
        }

        // flag para NO CRUD
        if (!isset($carrito['idUsuario'])) {
            $this->sql = "UPDATE carritos SET fecha = :fechaCarrito WHERE id = :idCarrito";
            $params = [
                "idCarrito" => $carrito["id"],
                "fechaCarrito" => $carrito["fecha"]
            ];
            try {
                $this->execSQL($params);
            } catch (Exception $e) {
                $this->setError(409, 'CARRITO_INEXISTENTE');
                die();
            }
            $this->sql = "SELECT
                                carritos.id,
                                carritos.fecha,
                                articulosencarritos.idArticulo,
                                articulosencarritos.cantidad
                            FROM
                                carritos JOIN articulosencarritos ON
                                    articulosencarritos.idCarrito = carritos.id
                            WHERE carritos.id = :idCarrito AND carritos.idUsuario = :idUsuario";
    
            $params = [
                "idUsuario" => $this->auth->getLoggedId(),
                "idCarrito" => $carrito["id"]
            ];
            try {
                $this->execSQL($params);
            } catch (Exception $e) {
                $this->setError(409, 'USUARIO_Y_O_CARRITO_INEXISTENTE');
                die();
            }
            $datosEnDB = $this->data;
            // Si existen en la DB pero no en el carrito, se eliminan de la DB
            foreach ($datosEnDB as $linea) {
                $enCarrito = FALSE;
                foreach ($carrito["articulos"] as $articulo) {
                    if ($articulo["id"] == $linea["idArticulo"]) {
                        $enCarrito = TRUE;
                        break;
                    }
                }
                if (!$enCarrito) {
                    $this->sql = "DELETE FROM articulosencarritos WHERE idArticulo = :idArticulo AND idCarrito = :idCarrito";
                    $params = [
                        "idArticulo" => $linea["idArticulo"],
                        "idCarrito" => $carrito["id"]
                    ];
                    try {
                        $this->execSQL($params);
                    } catch (Exception $e) {
                        $this->setError(409, 'CARRITO_Y_O_ARTICULO_INEXISTENTE');
                        die();
                    }
                }
            }
            // Si existen en el carrito pero no en la base se crean, y sino se actualizan
            foreach ($carrito["articulos"] as $articulo) {
                $enDB = FALSE;
                foreach ($datosEnDB as $linea) {
                    if ($articulo["id"] == $linea["idArticulo"]) {
                        $enDB = TRUE;
                        if ($articulo["cantidad"] != $linea["cantidad"]) {
                            $this->sql = "UPDATE articulosencarritos SET cantidad = :cantidadArticulo WHERE idArticulo = :idArticulo AND idCarrito = :idCarrito";
                            $params = [
                                "idArticulo" => $linea["idArticulo"],
                                "idCarrito" => $carrito["id"],
                                "cantidadArticulo" => $articulo["cantidad"]
                            ];
                            try {
                                $this->execSQL($params);
                            } catch (Exception $e) {
                                $this->setError(409, 'CARRITO_Y_O_ARTICULO_INEXISTENTE');
                                die();
                            }
                        }
                        break;
                    }
                }
                if (!$enDB) {
                    $this->sql = "INSERT INTO articulosencarritos VALUES (:idCarrito, :idArticulo, :cantidad)";
                    $params = [
                        "idCarrito" => $carrito["id"],
                        "idArticulo" => $articulo["id"],
                        "cantidad" => $articulo["cantidad"]
                    ];
                    try {
                        $this->execSQL($params);
                    } catch (Exception $e) {
                        $this->setError(409, 'CARRITO_Y_O_ARTICULO_INEXISTENTE');
                        die();
                    }
                }
            }
            $this->data = $carrito;
            $this->setData();

            return;
        } // end if flag CRUD

        $this->sql = 'UPDATE carritos
                      SET
                        idUsuario = :idUsuario,
                        fecha = :fecha
                      WHERE id = :id';
        $params = [
            "id" => $this->controller->getParam("id"),
            "idUsuario" => $carrito["idUsuario"],
            "fecha" => $carrito["fecha"]
        ];

        $this->sql = 'SELECT * FROM carritos WHERE id = :id';
        $this->execSQL([
            'id' => $this->controller->getParam("id")
        ]);

        $this->setData();
    }
}