<?php

header('Content-Type: application/json');
$json = '{"Contenido":"';
$json .= "<div class='c-carrusel js-carrusel'></div>";
$json .= "<div class='c-portada__texto'>";
$json .= "<h1>¡Bienvenido a <span class='c-logo__parte'>Week</span><span class='c-logo__parte c-logo__parte--alterna'>Food</span>!</h1>";
$json .= "Somos una empresa ficticia, ofrecemos gran variedad de platos preparados para entrega en el hogar, el trabajo, o la escuela.";
$json .= "<br>Con <span class='c-logo__parte'>Week</span><span class='c-logo__parte c-logo__parte--alterna'>Food</span> nunca mas tendrás que preocuparte de que vas a comer hoy.";
$json .= "</div>";
$json .= '"}';
echo json_encode($json);