<?php

use core\MVC\Resource as Resource;

class ApiResource extends Resource {
    public function errorAction() {
        $this->setError(400, 'Petición incorrecta');
    }

    public function testAction() {
        $this->data = [
            "deleted" => true
        ];

        $this->setData();
    }
}