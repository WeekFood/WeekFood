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

    public function postProductoAction() {
        $json = file_get_contents('php://input');
        $producto = json_decode($json, true);

        // preparar categoria para la BD
        $producto['categoria'] = implode(',', $producto['categoria']);
        // hay que castear a boolean manualmente
        $producto['destacado'] = (int) $producto['destacado'];

        $this->sql = 'INSERT INTO productos 
                        (nombre, categoria, descripcion, foto, destacado, precio) 
                     VALUES
                        (:nombre, :categoria, :descripcion, :foto, :destacado, :precio)';
        
        $this->execSQL($producto);
        $idNuevoProducto = $this->data;

        $this->sql = 'SELECT * FROM productos WHERE id = :id';
        $this->execSQL([
            "id" => $idNuevoProducto
        ]);

        http_response_code(201);
        $this->setData();
    }

    public function putProductoAction() {
        $json = file_get_contents('php://input');
        $producto = json_decode($json, true);

        $id = $this->controller->getParam('id');

        // preparar categoria para la BD
        $producto['categoria'] = implode(',', $producto['categoria']);
        // hay que castear a boolean manualmente
        $producto['destacado'] = (int) $producto['destacado'];

        $this->sql = 'UPDATE productos
                      SET
                        nombre = :nombre,
                        categoria = :categoria,
                        descripcion = :descripcion,
                        foto = :foto,
                        destacado = :destacado,
                        precio = :precio
                      WHERE id = :id';

        $this->execSQL([
            "nombre" => $producto['nombre'],
            "categoria" => $producto['categoria'],
            "descripcion" => $producto['descripcion'],
            "foto" => $producto['foto'],
            "destacado" => $producto['destacado'],
            "precio" => $producto['precio'],
            "id" => $id
        ]);

        $this->sql = 'SELECT * FROM productos WHERE id = :id';
        $this->execSQL([
            "id" => $id
        ]);

        $this->setData();
    }

    public function deleteProductoAction() {
        $id = $this->controller->getParam('id');

        $this->sql = 'DELETE FROM productos WHERE id = :id';
        $this->execSQL([
            'id' => $id
        ]);

        http_response_code(204);
    }

    public function getCategoriasPrincipalesAction() {
        $this->sql = 'SELECT nombre FROM categoriasprincipales';
        $this->execSQL();
        $this->setData();
    }

    public function postCategoriaPrincipalAction() {
        $json = file_get_contents('php://input');
        $categoria = json_decode($json, true);

        $this->sql = 'INSERT INTO categoriasprincipales 
                        (nombre) 
                     VALUES
                        (:nombre)';
        
        $this->execSQL($categoria);
        $nombreNuevaCategoria = $this->data;

        $this->sql = 'SELECT * FROM categoriasprincipales WHERE nombre = :nombre LIMIT 1';
        $this->execSQL([
            "nombre" => $nombreNuevaCategoria
        ]);

        http_response_code(201);
        $this->setData();
    }

    public function putCategoriaPrincipalAction() {
        $json = file_get_contents('php://input');
        $categoria = json_decode($json, true);

        $nombreAnterior = $this->controller->getParam('nombre');

        $this->sql = 'UPDATE categoriasprincipales
                      SET
                        nombre = :nombreNuevo
                      WHERE nombre = :nombreAnterior';

        $this->execSQL([
            'nombreNuevo' => $categoria['nombre'],
            'nombreAnterior' => $nombreAnterior
        ]);

        $this->sql = 'SELECT * FROM categoriasprincipales WHERE nombre = :nombre';
        $this->execSQL([
            "nombre" => $categoria['nombre']
        ]);

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

    public function getCategoriaAction() {
        $params = [
            "categoriaEspecifica" => $this->controller->getParam("categoria")
        ];
        $this->sql = 'SELECT * FROM productos WHERE FIND_IN_SET(:categoriaEspecifica,categoria)';
        $this->execSQL($params);
        $this->setData();
    }

    public function postCategoriaAction() {
        $json = file_get_contents('php://input');
        $subcategoria = json_decode($json, true);

        // el CRUD manda subCategoriaDe como modelo de Categoria, solo nos hace falta el string
        $subcategoria['subCategoriaDe'] = $subcategoria['subCategoriaDe']['nombre'];

        $this->sql = 'INSERT INTO categorias 
                        (nombre, subCategoriaDe) 
                     VALUES
                        (:nombre, :subCategoriaDe)';
        
        try {
            $this->execSQL($subcategoria);
        } catch (PDOException $e) {
            switch($e->getCode()) {
                case 23000: // Integrity constraint violation: 1452 Cannot add or update a child row: a foreign key constraint fails
                    $this->setError(409, 'NO_EXISTE_CATEGORIA');
                    break;
                default:
                    $this->setError(500, 'ERROR_PDO');
            }

            exit();
        }

        $nombreNuevaSubcategoria = $this->data;

        $this->sql = 'SELECT * FROM categorias WHERE nombre = :nombre LIMIT 1';
        $this->execSQL([
            "nombre" => $nombreNuevaSubcategoria
        ]);

        http_response_code(201);
        $this->setData();
    }

    function putCategoriaAction() {
        $json = file_get_contents('php://input');
        $subcategoria = json_decode($json, true);

        $nombreAnterior = $this->controller->getParam('nombre');

        // el CRUD manda subCategoriaDe como modelo de Categoria, solo nos hace falta el string
        $subcategoria['subCategoriaDe'] = $subcategoria['subCategoriaDe']['nombre'];

        $this->sql = 'UPDATE categorias
                      SET
                        nombre = :nombreNuevo,
                        subCategoriaDe = :subCategoriaDe
                      WHERE nombre = :nombreAnterior';

        try {
            $this->execSQL([
                'nombreNuevo' => $subcategoria['nombre'],
                'subCategoriaDe' => $subcategoria['subCategoriaDe'],
                'nombreAnterior' => $nombreAnterior
            ]);
        } catch (PDOException $e) {
            switch($e->getCode()) {
                case 23000: // Integrity constraint violation: 1452 Cannot add or update a child row: a foreign key constraint fails
                    $this->setError(409, 'NO_EXISTE_CATEGORIA');
                    break;
                default:
                    $this->setError(500, 'ERROR_PDO');
            }

        }

        $this->sql = 'SELECT * FROM categorias WHERE nombre = :nombre';
        $this->execSQL([
            "nombre" => $subcategoria['nombre']
        ]);

        $this->setData();
    }

    public function getCategoriasAction(){
        $this->sql = 'SELECT * FROM categorias';
        $this->execSQL();
        $this->setData();
    }

    public function getDestacadosAction() {
        if ($this->controller->getParam("destacado") !== '1') {
            $this->setError(400, 'Petición incorrecta');
            return false;
        }
        $params = [
            "destacado" => $this->controller->getParam("destacado")
        ];
        $this->sql = 'SELECT * FROM productos WHERE destacado = :destacado';
        $this->execSQL($params);
        $this->setData();
    }

    public function getProductoIDAction() {
        $params = [
            "id" => $this->controller->getParam("id")
        ];
        $this->sql = 'SELECT * FROM productos WHERE id = :id';
        $this->execSQL($params);
        $this->setData();
    }
}