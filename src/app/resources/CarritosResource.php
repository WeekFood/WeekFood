<?php

use core\MVC\Resource as Resource;

class CarritosResource extends Resource {
    public function getCarritoAction() {
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
        try {
            $this->execSQL($params);
        } catch (Exception $e) {
            $this->setError(409, 'Usuario inexistente');
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

    public function postCarritoAction() {
        $json = file_get_contents('php://input');
        $carrito = json_decode($json, true);
        $idUsuario = 1; // TODO, usar id usuario de la sesion
        if (!array_key_exists("fecha", $carrito)) {
            $this->setError(400, 'Petición incorrecta');
            die();
        } else if (strlen($carrito["fecha"]) != 19) {
            $this->setError(400, 'Petición incorrecta');
            die();

        }
        foreach ($carrito["articulos"] as $articulo) {
            if ((!array_key_exists("id", $articulo)) || (!array_key_exists("cantidad", $articulo))) {
                $this->setError(400, 'Petición incorrecta');
                die();
            }
        }
        $params = [
            "idUsuario" => $idUsuario,
            "fecha" => $carrito["fecha"]
        ];
        $this->sql = "INSERT INTO carritos (idUsuario, fecha) VALUES (:idUsuario, :fecha)";
        try {
            $this->execSQL($params);
        } catch (Exception $e) {
            $this->setError(409, 'Usuario inexistente');
            die();
        }
        $carrito["id"] = $this->data;
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
                $this->setError(409, 'Carrito y/o articulo inexistente');
                die();
            }
        }
        $this->data = $carrito;
        $this->setData();
    }

    public function putCarritoAction() {
        $json = file_get_contents('php://input');
        $carrito = json_decode($json, true);
        $idUsuario = 1; // TODO, usar id usuario de la sesion
        if (!array_key_exists("id", $carrito)) {
            $this->setError(400, 'Petición incorrecta');
            die();
        }
        if ($this->controller->getParam("id") != $carrito["id"]) {
            $this->setError(400, 'Petición incorrecta');
            die();
        }
        if (!array_key_exists("fecha", $carrito)) {
            $this->setError(400, 'Petición incorrecta');
            die();
        } else if (strlen($carrito["fecha"]) != 19) {
            $this->setError(400, 'Petición incorrecta');
            die();

        }
        foreach ($carrito["articulos"] as $articulo) {
            if ((!array_key_exists("id", $articulo)) || (!array_key_exists("cantidad", $articulo))) {
                $this->setError(400, 'Petición incorrecta');
                die();
            }
        }
        $this->sql = "UPDATE carritos SET fecha = :fechaCarrito WHERE id = :idCarrito";
        $params = [
            "idCarrito" => $carrito["id"],
            "fechaCarrito" => $carrito["fecha"]
        ];
        try {
            $this->execSQL($params);
        } catch (Exception $e) {
            $this->setError(409, 'Carrito inexistente');
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
            "idUsuario" => $idUsuario,
            "idCarrito" => $carrito["id"]
        ];
        try {
            $this->execSQL($params);
        } catch (Exception $e) {
            $this->setError(409, 'Usuario y/o carrito inexistente');
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
                    $this->setError(409, 'Carrito y/o articulo inexistente');
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
                            $this->setError(409, 'Carrito y/o articulo inexistente');
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
                    $this->setError(409, 'Carrito y/o articulo inexistente');
                    die();
                }
            }
        }
        $this->data = $carrito;
        $this->setData();
    }
}