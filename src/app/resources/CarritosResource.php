<?php

use core\MVC\Resource as Resource;

class CarritosResource extends Resource {
    public function getCarritoAction() {
        $this->sql =    "SELECT 
                            carritos.id,
                            carritos.fecha, 
                            articulosencarritos.idArticulo,
                            articulosencarritos.cantidad 
                        FROM 
                            carritos RIGHT JOIN articulosencarritos ON 
                                articulosencarritos.idCarrito = carritos.id
                        WHERE carritos.idUsuario = :idUsuario";

        $idUsuario = 1; // TODO, usar id usuario de la sesion
        $params = [
            "idUsuario" => $idUsuario
        ];
        $this->execSQL($params);
        $carrito = [
            "id" => $this->data[0]["id"],
            "fecha" => $this->data[0]["fecha"],
            "articulos" => []
        ];
        foreach($this->data as $linea){
            $articulo = ["id"=>$linea["idArticulo"],"cantidad"=>$linea["cantidad"]];
            array_push($carrito["articulos"],$articulo);
        }
        $this->data = $carrito;
        $this->setData();
    }
    /*
    // original yuriy
    public function getCarritoAction() {
        $params = [
            "id" => $this->controller->getParam("id")
        ];

        $this->sql = 'SELECT *, UNIX_TIMESTAMP(fecha) as fecha FROM carritos WHERE id = :id';
        $this->execSQL($params);

        if ($this->data == null) {
            header('HTTP/1.1 404 Not Found', true, 404);
            $this->data = (object) null;
        }
        $this->setData();
    }*/

    public function postCarritoAction() {
        $json = file_get_contents('php://input');
        $carrito = json_decode($json,true);
        $idUsuario = 1; // TODO, usar id usuario de la sesion

        $params = [
            "idUsuario" => $idUsuario,
            "fecha" => $carrito["fecha"]
        ];
        $this->sql = "INSERT INTO carritos (idUsuario, fecha) VALUES (:idUsuario, :fecha)";

        $this->execSQL($params);
        $carrito["id"] = $this->data;
        foreach($carrito["articulos"] as $articulo){
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
        $carrito = json_decode($json,true);
        $idUsuario = 1; // TODO, usar id usuario de la sesion
        $this->sql = "UPDATE carritos SET fecha = :fechaCarrito WHERE id = :idCarrito";
        $params = [
            "idCarrito" => $carrito["id"],
            "fechaCarrito" => $carrito["fecha"]
        ];
        $this->execSQL($params);
        $this->sql =    "SELECT 
                            carritos.id,
                            carritos.fecha, 
                            articulosencarritos.idArticulo,
                            articulosencarritos.cantidad 
                        FROM 
                            carritos RIGHT JOIN articulosencarritos ON 
                                articulosencarritos.idCarrito = carritos.id
                        WHERE carritos.id = :idCarrito AND carritos.idUsuario = :idUsuario";
        
        $params = [
            "idUsuario" => $idUsuario,
            "idCarrito" => $carrito["id"]
        ];
        $this->execSQL($params);
        $datosEnDB = $this->data;
        // Si existen en la DB pero no en el carrito, se eliminan de la DB
        foreach($datosEnDB as $linea){
            $enCarrito = FALSE;
            foreach($carrito["articulos"] as $articulo){
                if ($articulo["id"] == $linea["idArticulo"]){
                    $enCarrito = TRUE;
                    break;
                }
            }
            if (!$enCarrito){
                $this->sql = "DELETE FROM articulosencarritos WHERE idArticulo = :idArticulo AND idCarrito = :idCarrito";
                $params = [
                    "idArticulo" => $linea["idArticulo"],
                    "idCarrito" => $carrito["id"]
                ];
                $this->execSQL($params);
            }
        }
        // Si existen en el carrito pero no en la base se crean, y sino se actualizan
        foreach($carrito["articulos"] as $articulo){
            $enDB = FALSE;
            foreach($datosEnDB as $linea){
                if ($articulo["id"] == $linea["idArticulo"]){
                    $enDB = TRUE;
                    if ($articulo["cantidad"] != $linea["cantidad"]){
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
            if (!$enDB){
                $this->sql = "INSERT INTO articulosencarritos VALUES (:idCarrito, :idArticulo, :cantidad)";
                $params = [
                    "idCarrito" => $carrito["id"],
                    "idArticulo" => $articulo["id"],
                    "cantidad" => $articulo["cantidad"]
                ];
                $this->execSQL($params);
            }
        }
        $this->setData();
    }
}