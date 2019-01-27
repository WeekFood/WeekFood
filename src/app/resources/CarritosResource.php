<?php

use core\MVC\Resource as Resource;

class CarritosResource extends Resource {
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
    }

    public function postCarritoAction() {

        $json = file_get_contents('php://input');
        $carrito = json_decode($json,true);
        $this->data = $carrito;
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

        $plain = file_get_contents('php://input');

        $data = json_decode($plain);

        $this->data = $data;

        $this->setData();
    }
    // CODIGO PRUEBA -->
    public function getPruebaAction(){
        
        header('Content-Type: application/json; charset=utf-8');
        echo '{"fecha":1548268821065,"articulos":[{"id":8,"cantidad":1},{"id":10,"cantidad":1}]}';
        
        /*
        $this->data = [];
        $this->setData();
        */
    }
    // <-- CODIGO PRUEBA
}