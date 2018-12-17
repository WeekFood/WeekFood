<?php
if ($this->params["funcion"]) {
    header('Content-Type: application/json');
    $json = '{"' . ucfirst($this->params["funcion"]) . '":[';
    $lineaNum = 1;
    foreach ($this->params["datos"]["data"] as $linea) {
        $json .= "{";
        $columnaNum = 1;
        foreach ($linea as $llave => $valor) {
            $json .= '"' . $llave . '":"' . $valor;
            if ($columnaNum < count($linea)) {
                $json .= '",';
            } else {
                $json .= '"';
            }
            $columnaNum++;

        }
        if ($lineaNum < count($this->params["datos"]["data"])) {
            $json .= "},";
        } else {
            $json .= "}";
        }
        $lineaNum++;
    }
    $json .= ']}';
} else {

    $json = '{}';
}
echo json_encode($json);