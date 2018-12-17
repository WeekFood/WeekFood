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
}