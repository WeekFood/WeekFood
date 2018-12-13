<?php

return array(	
	"routes" => array(
		"/" => array(
			"route" => "/",
			"controller" => "index",
			"action" => "index"
		),

		"Historia" => array(
			"route" => "historia",
			"controller" => "index",
			"action" => "historia"
		),

		"Jugadores" => array(
			"route" => "jugadores",
			"controller" => "index",
			"action" => "jugadores"
		),

		"JugadoresEquipo" => array(
			"route" => "jugadores/:idEquipo",
			"controller" => "index",
			"action" => "jugadoresEquipo"
		),


		"Jugador" => array(
			"route" => "jugador/:idJugador",
			"controller" => "jugador",
			"action" => "datos_jugador"
		),

		"partidos" => array(
			"route" => "partidos",
			"controller" => "index",
			"action" => "partidos"
		),

		"Login" => array(
				"route" => "/login",
				"page" => "login.php"
			),

		"Registrarse" => array(
				"route" => "/registrarse",
				"page" => "registrarse.php"
			),

		"compruebaLogin" => array(
				"route" => "/compruebaLogin",
				"page" => "compruebaLogin.php"
			),

		"logout" => array(
				"route" => "/logout",
				"page" => "logout.php"
			),

		"preferencias" => array(
				"route" => "/preferencias",
				"page" => "preferencias.php"
			),

		"cambiaAvatar" => array(
				"route" => "/cambiaAvatar",
				"page" => "cambiaAvatar.php"
			),

		),
	"error" => "error.php"
);

