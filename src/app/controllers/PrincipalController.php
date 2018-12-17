<?php
class PrincipalController extends core\MVC\Action
{
    public function IndexAction()
    {
        $this->setView("index");
        $this->renderView();
    }public function ApiAction()
    {
        $this->setView("api");
        $this->renderView();
    }
    /* //Para no discriminar si viene con ?x o ?x=y, buscar forma de hacerlo automatico
public function Api_param_valorAction()
{
//$this->params["parametro"] = $this->getParam("parametro");
$this->setView("api"); //,$this->params);
$this->renderView();
}public function Api_paramAction()
{
//$this->params["parametro"] = $this->getParam("parametro");
$this->setView("api"); //,$this->params);
$this->renderView();
}
 */
}