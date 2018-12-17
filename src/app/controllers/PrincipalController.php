<?php
class PrincipalController extends core\MVC\Action
{
    private $params = array();
    public function IndexAction()
    {
        $this->setView("index");
        $this->renderView();
    }
    public function ApiAction()
    {
        if (isset($_GET["menu"])) {
            $model = $this->getModel('api', 'Menu');
            $this->params["funcion"] = 'menu';
            $this->params["datos"] = $model->select("*");
        } else {
            $this->params["funcion"] = false;
        }
        $this->setView("api", $this->params);
        $this->renderView();
    }
    //Para no discriminar si viene con ?x o ?x=y, buscar forma de hacerlo automatico
    public function Api_param_valorAction()
    {
        //$this->params["parametro"] = $this->getParam("parametro");
        //$this->setView("api"),$this->params);
        //$this->renderView();
        $this->ApiAction();
    }
    public function Api_paramAction()
    {
        //$this->params["parametro"] = $this->getParam("parametro");
        //$this->setView("api"); //,$this->params);
        //$this->renderView();
        $this->ApiAction();
    }

}