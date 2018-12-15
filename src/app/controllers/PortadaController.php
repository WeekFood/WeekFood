<?php
$this->globals = core\Globals::getInstance();
$config = $this->globals->get("config");
include_once $config["site"]["coreMVC"] . "action.php";
class PortadaController extends core\MVC\Action
{

    public function PortadaAction()
    {
        $config = $this->globals->get("config");
        include_once $config["site"]["views"] . "portada.php";
    }
}