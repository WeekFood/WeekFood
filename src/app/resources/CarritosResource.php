<?php

use core\MVC\Resource as Resource;

class CarritosResource extends Resource {
    public function getCarritoAction() {
        $idUsuario = 1; // TODO, usar id usuario de la sesion
        if ($idUsuario != $this->controller->getParam("idUsuario")) {
            $this->setError(401, 'Desautorizado');
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
                        WHERE carritos.idUsuario = :idUsuario";

        $params = [
            "idUsuario" => $idUsuario
        ];
        $this->execSQL($params);
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
        $this->data = $carrito;
        $this->setData();
    }

    public function postCarritoAction() {
        $json = file_get_contents('php://input');
        $carrito = json_decode($json, true);
        $idUsuario = 1; // TODO, usar id usuario de la sesion
        if ($idUsuario != $this->controller->getParam("idUsuario")) {
            $this->setError(401, 'Desautorizado');
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
            if (($articulo["id"] == NULL) || ($articulo["cantidad"] == NULL)) {
                $this->setError(400, 'Petición incorrecta');
                die();
            }
        }
        $params = [
            "idUsuario" => $idUsuario,
            "fecha" => $carrito["fecha"]
        ];
        $this->sql = "INSERT INTO carritos (idUsuario, fecha) VALUES (:idUsuario, :fecha)";

        $this->execSQL($params);
        $carrito["id"] = $this->data;
        foreach ($carrito["articulos"] as $articulo) {
            $this->sql = "INSERT INTO articulosencarritos VALUES (:idCarrito, :idArticulo, :cantidad)";
            $params = [
                "idCarrito" => $carrito["id"],
                "idArticulo" => $articulo["id"],
                "cantidad" => $articulo["cantidad"]
            ];
            $this->execSQL($params);
        }
        $this->data = $carrito;
        $this->setData();
    }

    public function putCarritoAction() {
        $json = file_get_contents('php://input');
        $carrito = json_decode($json, true);
        $idUsuario = 1; // TODO, usar id usuario de la sesion
        if ($carrito["id"] == NULL) {
            $this->setError(400, 'Petición incorrecta');
            die();
        }
        if (($idUsuario != $this->controller->getParam("idUsuario")) || ($carrito["id"] != $this->controller->getParam("idCarrito"))) {
            $this->setError(401, 'Desautorizado');
            die();
        }
        if (($carrito["fecha"] == NULL) || (strlen($carrito["fecha"]) != 19)) {
            $this->setError(400, 'Petición incorrecta');
            die();
        }
        foreach ($carrito["articulos"] as $articulo) {
            if (($articulo["id"] == NULL) || ($articulo["cantidad"] == NULL)) {
                $this->setError(400, 'Petición incorrecta');
                die();
            }
        }
        $this->sql = "UPDATE carritos SET fecha = :fechaCarrito WHERE id = :idCarrito";
        $params = [
            "idCarrito" => $carrito["id"],
            "fechaCarrito" => $carrito["fecha"]
        ];
        $this->execSQL($params);
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
        $this->execSQL($params);
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
                $this->execSQL($params);
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
                        $this->execSQL($params);
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
                $this->execSQL($params);
            }
        }
        $this->data = $carrito;
        $this->setData();
    }
}