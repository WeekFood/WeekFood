<?php

//Se llamara a la base de datos en un futuro. ???
#$modelo = $this->getModel('menu', 'Menu');

header('Content-Type: application/json; charset=utf-8');
$json = '{"Contenido": "<ul class=\'c-menu__lista\'>';
/*
if ($datos["error"]){
$json .= $datos["error_code"];
}else{
foreach ($datos["data"] as $linea) {
if ($linea["destacado"] == "1"){
$json .= "<li class='c-menu__item c-menu__item--destacado'><";
}else{
$json .= "<>";
}
}
}
 */
$datos = [
    "1" => [
        "nombre" => "Inicio",
        "url" => "portada",
    ],
    "2" => [
        "nombre" => "Productos",
        "url" => "#",
    ],
    "3" => [
        "nombre" => "Ofertas",
        "url" => "#",
    ],
    "4" => [
        "nombre" => "Recomendados",
        "url" => "#",
    ],
    "5" => [
        "nombre" => "Alérgenos",
        "url" => "#",
    ],
];
foreach ($datos as $item) {
    if ($item["url"] == $this->params["pagina"]) {
        $json .= "<li class='c-menu__item c-menu__item--destacado'";
    } else {
        $json .= "<li class='c-menu__item'";
    }
    //$json .= '<a href=\\"javascript:cargarDatosDesde(';
    $json .= 'onclick=\\"cargarDatosDesde(';
    $json .= "'/api/" . $item["url"] . '\')\">' . $item["nombre"];
    //$json .= "</a></li>";
    $json .= "</li>";
    
}
$json .= '</ul>"}';
echo json_encode($json);