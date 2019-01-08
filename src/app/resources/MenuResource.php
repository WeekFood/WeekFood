<?php

use core\MVC\Resource as Resource;

class MenuResource extends Resource {
    public function getTodosAction() {
        $this->sql = 'SELECT * FROM Menu';
        $this->execSQL();

        $this->setData();
    }
}