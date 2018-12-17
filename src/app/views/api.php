<?php
if (isset($_GET["categorias"])) {

    header('Content-Type: application/json');
    $json = '{"Categorias":[';
    $json .= '"Inicio",';
    $json .= '"Ofertas",';
    $json .= '"Menús"';
    $json .= ']}';
    echo json_encode($json);
}