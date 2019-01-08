<?php


return array(	
	"get" => array(
		"Equipos" => array(
			"route" => "equipos",
			"resource" => "equipos",
			"action" => "getAll"
		),

		"Equipo" => array(
			"route" => "equipos/:equipo",
			"resource" => "equipos",
			"action" => "getById"
		),

		"Jugadores" => array(
			"route" => "jugadores",
			"resource" => "jugadores",
			"action" => "getAll"
		),

		"jugador" => array(
			"route" => "jugadores/:jugador",
			"resource" => "jugadores",
			"action" => "getById"
		), 

		"JugadoresEquipo" => array(
			"route" => "equipos/:equipo/jugadores",
			"resource" => "jugadores",
			"action" => "getByTeam"
		),

		"PartidosEquipo" => array(
			"route" => "equipos/:equipo/partidos",
			"resource" => "partidos"
		)
	)

);


