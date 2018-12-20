<?php
header('Content-Type: application/json; charset=utf-8');
$json = '{"Contenido": "<ul class=\'c-menu__lista\'>';

if ($this->params["datos"]["error"]){
    $json .= $this->params["datos"]["error_code"];
}else{
    foreach ($this->params["datos"]["data"] as $linea) {
        if ($linea["valor"] == "Inicio"){
            $json .= "<li class='c-menu__item c-menu__item--destacado'";
        }else{
            $json .= "<li class='c-menu__item ";
        }
    $json .= 'onclick=\\"cargarDatosDesde(';
    $json .= "'/api/" . $linea["direccion"] . '\')\">' . $linea["valor"];
    $json .= "</li>";
    }
}
$json .= '</ul>"}';

echo json_encode($json);