<?php
namespace core\MVC;

use \core;

class Controller extends Router {

    private $resourceName = "";
    private $resourcePath = "";
    private $defaultRoutesConfig = "";
    private $actionName = "";
    private $params = array();
    protected $globals;
    private $defaultActionName = "error";
    private $defaultResourceName = "error";

    public function __construct() {
        $this->globals = core\Globals::getInstance();
        $this->auth = $this->globals->get('auth');
        $config = $this->globals->get("config");
        $this->resourcePath = $config["site"]["resources"];
        $this->defaultRoutesConfig = $config["site"]["configs"] . "routes.php";
        $routesFile = $this->defaultRoutesConfig;
        if (!file_exists($routesFile)) {
            throw new ControllerException("Router configuration file (" . $routesFile . ") not found.");
        }
        $routes = require_once $routesFile;
        $this->addRoutesFromFile($routes);
    }

    private function setResourceName($resourceName) {
        if (!is_string($resourceName)) {
            throw new ControllerException("Invalid Controller Name.");
        }

        $this->resourceName = ucfirst(strtolower($resourceName)) . "Resource";
    }

    private function setActionName($actionName) {
        if (!is_string($actionName)) {
            throw new ControllerException("Invalid Action Name.");
        }

        $this->actionName = ucfirst(strtolower($actionName)) . "Action";
    }

    public function run() {
        if (($route = $this->parseUriRouter()) != null) {
            $puedeAcceder = $this->auth->canAccessProtectedRoute($route);
            if ($puedeAcceder === null) {
                $this->auth->noAuthGuard();
                return false;
            }
            if ($puedeAcceder) {
                $this->setResourceName($route["resource"]);
                $this->setActionName($route["action"]);
            } else {
                $this->setResourceName("auth");
                $this->setActionName("authGuardRechazado");
            }
        } else {
            if (substr($_SERVER["REQUEST_URI"], 0, 5) == "/api/") {
                $this->setActionName("error");
                $this->setResourceName("api");
            } else {
                $this->setResourceName($this->defaultResourceName);
                $this->setActionName($this->defaultActionName);
            }
        }
        $this->includeResource($this->resourceName);
        $resource = new $this->resourceName();
        $resource->run($this->actionName, $this);
    }

    private function includeResource($resourceName) {
        $resourceFile = $this->resourcePath . $resourceName . ".php";
        if (!file_exists($resourceFile)) {
            throw new ControllerException("Resource file (" . $resourceFile . ") cannot be found");
        }
        require_once $resourceFile;
    }
}