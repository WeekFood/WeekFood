<?php

use core\MVC\Resource as Resource;

class ClienteResource extends Resource {
    public function indexAction() {
        require_once('../../cliente/index.html');
    }
}