<?php

use core\MVC\Resource as Resource;

class MenuResource extends Resource {
    public function getAction() {
        $this->sql = 'SELECT * FROM Menu';
        $this->execSQL();

        $this->setData();
    }
}