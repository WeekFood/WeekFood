<?php

use core\MVC\Resource as Resource;

class ProductosResource extends Resource {
    public function getCarruselAction() {
        $this->sql = 'SELECT foto FROM productos ORDER BY RAND() LIMIT 5';
        $this->execSQL();
        $this->setData();
    }

    public function getTodosAction() {
        $this->sql = 'SELECT * FROM productos';
        $this->execSQL();
        $this->setData();
    }

    public function getCategoriasPrincipalesAction() {
        $this->sql = 'SELECT nombre FROM categoriasprincipales';
        $this->execSQL();
        $this->setData();
    }

    public function getCategoriaPrincipalAction() {
        $params = [
            "nombre" => $this->controller->getParam("nombre")
        ];
        $this->sql = 'SELECT nombre FROM categorias WHERE subCategoriaDe = :nombre';
        $this->execSQL($params);
        $this->setData();
    }
    
    public function getCategoriaAction(){
        $params = [
            "categoriaEspecifica" => "%" . $this->controller->getParam("categoria") . "%"
        ];
        $this->sql = 'SELECT nombre FROM categorias WHERE nombre LIKE :categoriaEspecifica';
        $this->execSQL($params);

        $categoriaIgual = FALSE;
        foreach($this->data as $categoriaEnBase){
            if ($categoriaEnBase["nombre"] == $this->controller->getParam("categoria")){
                $categoriaIgual = TRUE;
            }
        }

        if ($categoriaIgual){
            $this->sql = 'SELECT * FROM productos WHERE categoria LIKE :categoriaEspecifica';
            $this->execSQL($params);
        }else{
            $this->data = (object) null;
        }
        $this->setData();
    }

    public function getDestacadosAction() {
        if ($this->controller->getParam("destacado") !== '1'){
            $this->setError(400, 'Petición incorrecta');
            return false;
        }
        $params = [
            "destacado" =>  $this->controller->getParam("destacado")
        ];
        $this->sql = 'SELECT * FROM productos WHERE destacado = :destacado';
        $this->execSQL($params);
        $this->setData();
    }
}