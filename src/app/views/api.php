<?php
if ($this->params["funcion"]) {
    header('Content-Type: application/json');
    $json = json_encode($this->params["datos"]["data"]);
} else {
    $json = '{}';
}
echo json_encode($json);