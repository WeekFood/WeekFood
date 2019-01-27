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

        $this->data = $carrito;

        $this->setData();
    }
}