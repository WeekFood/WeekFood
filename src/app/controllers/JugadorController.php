<?php
class JugadorController extends core\MVC\Action {
    private $params = array();

    public function Datos_jugadorAction() {
        $this->params["idJugador"] = $this->getParam("idJugador");
        $this->setView("jugador", $this->params);
        $this->renderView();
    }

}