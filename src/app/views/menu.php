<?php

//Se llamara a la base de datos en un futuro. ???
#$modelo = $this->getModel('menu', 'Menu');

header('Content-Type: application/json');
$json = '{"Contenido": "';
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
        "url" => "productos",
    ],
    "3" => [
        "nombre" => "Ofertas",
        "url" => "ofertas",
    ],
    "4" => [
        "nombre" => "Recomendados",
        "url" => "recomendados",
    ],
    "5" => [
        "nombre" => "Alérgenos",
        "url" => "alergenos",
    ],
];
foreach ($datos as $item) {
    if ($item["url"] == $this->params["pagina"]) {
        $json .= "<li class='c-menu__item'>";
    } else {
        $json .= "<li class='c-menu__item c-menu__item--destacado'>";
    }
    $json .= '<a href=\\"javascript:cargarDatosDesde(';
    $json .= "'/api/" . $item["url"] . '\')\">' . $item["nombre"];
    $json .= "</a></li>";
}
$json .= '"}';
echo json_encode($json);