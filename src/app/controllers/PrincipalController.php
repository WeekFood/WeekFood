<?php
class PrincipalController extends core\MVC\Action {
    public function IndexAction() {
        $this->setView("index");
        $this->renderView();
    }
}