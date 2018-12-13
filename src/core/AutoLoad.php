<?php

class AutoLoad {

    public function load($classNameSpace) {
        $classPath = str_replace("\\", "/", $classNameSpace);
        $className = substr($classNameSpace, strrpos($classNameSpace, "\\") + 1);
        if(!@include_once ROOT . DS . $classPath . ".php") {
            throw new Exception("Can't load $classPath");
        }
        if (!class_exists($classNameSpace, false) && !interface_exists($classNameSpace, false)) {
            throw new Exception('Class ' . $classNameSpace . ' not found');
        }
    }
    
    public function registerAutoLoad() {
        spl_autoload_register(array($this, "load"), true, true);
    }
}

$autoLoad = new AutoLoad();
$autoLoad->registerAutoLoad();