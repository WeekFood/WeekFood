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

    public function getCategoriasPrincipalesTodosAction() {
        $this->sql = 'SELECT * FROM CategoriasPrincipales';
        $this->execSQL();
        $this->setData();
    }

    public function getCategoriasTodosAction() {
        $params = [
            "categoriaPrincipal" => $this->controller->getParam("categoriaPrincipal")
        ];
        $this->sql = 'SELECT nombre FROM Categorias WHERE subCategoriaDe = :categoriaPrincipal';
        $this->execSQL($params);
        $this->setData();
    }

    public function getCategoriaAction() {
        $params = [
            "categoriaEspecifica" => "%".$this->controller->getParam("categoriaEspecifica")."%"
        ];
        $this->sql = 'SELECT * FROM Productos WHERE categoria LIKE :categoriaEspecifica';
        $this->execSQL($params);
        $this->setData();
    }
}