<?php

use core\MVC\Resource as Resource;

class CrudResource extends Resource {
    public function indexAction() {
        require_once ROOT . DS . 'crud' . DS . 'index.html';
    }
}