<?php

use core\MVC\Resource as Resource;

class ProductosResource extends Resource {
    public function getCarruselAction() {
        $this->sql = 'SELECT foto FROM Productos ORDER BY RAND() LIMIT 5';
        $this->execSQL();

        $this->setData();
    }
    
    public function getTodosAction() {
        $this->sql = 'SELECT * FROM Productos';
        $this->execSQL();

        $this->setData();
    }
}