<?php

use core\MVC\Resource as Resource;

class CarritosResource extends Resource {
    public function getCarritoAction() {
        $params = [
            "id" => $this->controller->getParam("id")
        ];

        $this->sql = 'SELECT * FROM carritos WHERE id = :id';
        $this->execSQL($params);

        if ($this->data == null) {
            header('HTTP/1.1 404 Not Found', true, 404);
            $this->data = (object) null;
        }
        $this->setData();
    }
    public function postCarritoAction() {

        $plain = file_get_contents('php://input');

        $data = json_decode($plain);

        $this->data = $data;

        $this->setData();
    }
    public function getPruebaAction(){
        
        header('Content-Type: application/json; charset=utf-8');
        echo '{"fecha":1548268821065,"articulos":[{"id":8,"cantidad":1},{"id":10,"cantidad":1}]}';
        
        /*
        $this->data = [];
        $this->setData();
        */
    }
}