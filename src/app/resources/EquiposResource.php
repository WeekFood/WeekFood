<?php

use core\MVC\Resource as Resource;

class EquiposResource extends Resource {
    //protected $id = 'Nombre';

    public function getAllAction() {
        $this->sql = 'SELECT * FROM equipos';
        $this->execSQL();
        $this->setData();
    }

    public function getByIdAction() {
        $equipo = $this->controller->getParam('equipo');
        $this->sql = 'SELECT * FROM equipos WHERE Nombre = :nombre';
        $params = array(
            'nombre' => $equipo,
        );
        $this->execSQL($params);
        $this->setData();
    }

}