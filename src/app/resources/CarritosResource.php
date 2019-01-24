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

        // TODO: insert
        // TODO: select y devolver el carrito hecho para que se pueda quedar con el id

        $json = file_get_contents('php://input');
        $carrito = json_decode($json);

        $idUsuario = 1; // TODO, usar id usuario de la sesion

        $params = [
            "fecha" => "'2019-12-31 23:59:59'"
        ];

        $this->sql = "INSERT INTO carritos (idUsuario, fecha) VALUES (1, '2019-12-31 23:59:59')";

        $this->execSQL();

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