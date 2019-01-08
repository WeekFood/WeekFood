<?php

use core\MVC\Resource as Resource;

class JugadoresResource extends Resource {
    //protected $id = 'Nombre';

    public function getAllAction() {
        $this->sql = 'SELECT * FROM jugadores';
        $this->execSQL();
        $this->setData();
    }

    public function getByIdAction() {
        $codigo = $this->controller->getParam('jugador');
        $this->sql = 'SELECT * FROM jugadores WHERE codigo = :codigo';
        $params = array(
            'codigo' => $codigo,
        );
        $this->execSQL($params);
        $this->setData();
    }

    public function getByTeamAction() {
        $equipo = $this->controller->getParam('equipo');
        $this->sql = 'SELECT * FROM jugadores WHERE Nombre_equipo = :equipo';
        $params = array(
            'equipo' => $equipo,
        );
        $this->execSQL($params);
        $this->setData();
    }


}