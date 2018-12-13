<?php
namespace core;

class Globals {
    private $globals = array();
	private static $instance = null;

	public static function getInstance() {
		if(self::$instance == null) {
			self::$instance = new Globals();
		}

		return self::$instance;
	}


	public function set($key, $value) {
		$this->globals[$key] = $value;
	}


	public function get($key) {
		if(array_key_exists($key, $this->globals)) {
			return $this->globals[$key];
		}

		return null;
	}
}