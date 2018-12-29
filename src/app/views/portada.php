<?php
header('Content-Type: application/json; charset=utf-8');
$json = '{"Contenido":"';
$json .= "<h1>¡Bienvenido a <span class='c-logo__parte'>Week</span><span class='c-logo__parte c-logo__parte--alterna'>Food</span>!</h1>";
$json .= "Somos una empresa ficticia, ofrecemos gran variedad de platos preparados para entrega en el hogar, el trabajo, o la escuela.";
$json .= "<br>Con <span class='c-logo__parte'>Week</span><span class='c-logo__parte c-logo__parte--alterna'>Food</span> nunca mas tendrás que preocuparte de que vas a comer hoy.";
$json .= '"}';
echo json_encode($json);