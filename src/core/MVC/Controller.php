<?php
namespace core\MVC;

use \core;

class Controller extends Router{

	private $controllerName = "";
	private $controllerPath = "";
	private $defaultRoutesConfig = "";
	private $actionName = "";
    private $params = array();
	protected $globals;
	private $defaultActionName = "error";
	private $defaultControllerName = "error";

    public function __construct() {
		$this->globals = core\Globals::getInstance();
		$config = $this->globals->get("config");
		$this->controllerPath = $config["site"]["controllers"];
		$this->defaultRoutesConfig = $config["site"]["configs"] . "routes.php";
        $routesFile = $this->defaultRoutesConfig;
		if(!file_exists($routesFile)) {
			throw new ControllerException("Router configuration file (" . $routesFile . ") not found.");
		}
		$routes = require_once $routesFile;
		if(!is_array($routes) || !array_key_exists("routes", $routes)) {
			throw new ControllerException("Invlid routes configuration file");
		}
		$this->addRoutesFromFile($routes);        
	}

	private function setControllerName($controllerName) {
		if(!is_string($controllerName)) {
			throw new ControllerException("Invalid Controller Name.");
		}

		$this->controllerName = ucfirst(strtolower($controllerName)) . "Controller";
	}

	private function setActionName($actionName) {
		if(!is_string($actionName)) {
			throw new ControllerException("Invalid Action Name.");
		}

		$this->actionName = ucfirst(strtolower($actionName)) . "Action";
	}

	public function run() {
		if(($route = $this->parseUriRouter()) != null) {
			$this->setControllerName($route["controller"]);
			$this->setActionName($route["action"]);
		}

		else {
			$this->setControllerName($this->defaultControllerName);
			$this->setActionName($this->defaultActionName);
		}
		$this->includeController($this->controllerName);		
		$controller = new $this->controllerName();
		$controller->run($this->actionName, $this);
	}

	private function includeController($controllerName) {
		$controllerFile = $this->controllerPath . $controllerName . ".php";
		if(!file_exists($controllerFile)) {
			throw new ControllerException("Controller file cannot be found");
		}
		require_once($controllerFile);
	}
}

