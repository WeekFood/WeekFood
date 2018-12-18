<?php
class PrincipalController extends core\MVC\Action
{
    private $params = array();
    public function IndexAction()
    {
        $this->setView("index");
        $this->renderView();
    }

}