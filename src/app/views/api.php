<?php
if ($this->params["funcion"] == "menu") {
    header('Content-Type: application/json');
    $json = '{"Menu":[';
    /*
    $json .= '"Inicio",';
    $json .= '"Ofertas",';
    $json .= '"Menús"';
     */
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
    str_replace(',}', '}', $json);
    str_replace(',]', ']', $json);
    echo json_encode($json);
}