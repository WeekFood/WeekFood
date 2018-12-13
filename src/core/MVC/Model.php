<?php
namespace core\MVC;

use \core;

class Model {
    protected $mysql;
    protected $result = array();
    protected $table;

    public function __construct($table) {
        $this->table = $table;
		$globals = core\Globals::getInstance();
		$this->mysql = $globals->get('mysql');
        $this->result['error'] = false;
        $this->result['error_message'] = '';
        $this->result['error_code'] = '';
        $this->result['data'] = array ();
    }


    public function select($fields = '*', $where = null, $order = null) {
        $sql = "SELECT " . $fields . " FROM " . $this->table;
        if ($where !== null)
            $sql .= ' WHERE ' . $where;
        if ($order !== null)
            $sql .= ' ORDER BY ' . $order;
        $ps = $this->mysql->prepare($sql);
        $ps->execute();
        $i = 0;
        foreach ($ps->fetchAll(\PDO::FETCH_ASSOC) as $row) {
            foreach ($row as $key => $value) {
               $this->result['data'][$i][$key] = $value;
            } 
            $i++;
        }
        return $this->result;
    }

    public function setError($errorCode = 0) {
        $this->result['error'] = true;
        $this->result['error_code'] = $errorCode;
        $this->result['error_message'] = $this->setErrorMessage($errorCode);
    }

    private function setErrorMessage($errorCode) {
        switch ($errorCode) {
            case 1:
                return 'Error en la consulta SQL';
                break;

            default:
                return 'Error desconocido';
                break;
        }
    }
}