<?php

use core\MVC\Resource as Resource;

class AdminResource extends Resource {
    public function indexAction() {
        require_once ROOT . DS . 'admin' . DS . 'index.html';
    }
}