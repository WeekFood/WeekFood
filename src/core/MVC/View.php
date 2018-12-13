<?php
namespace core\MVC;

use \core;

class View {
    private $view_name;
    private $view_path;
    private $params;
    public $data;

    public function __construct($name, $params) {
        $this->view_name = strtolower($name);
        $global = core\Globals::getInstance();
        $config = $global->get("config");
        $this->view_path = $config["site"]["views"];
        $this->params = $params;
    }

    public function render($data = null) {
        $this->data = $data;
        $view = $this->view_path . $this->view_name . ".php";
        if(!file_exists($view)) {
			throw new ControllerException("View file (" . $view . ") not found.");
        }    

        require_once $view;
    }

}