<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Portada</title>
    <link rel="stylesheet" type="text/css" media="screen" href="<?=CSS . DS?>estilos.css" />
</head>
<body>
<?php
    include "menu.php";
?>
<div id="content">
    <div id="players">  
    <?php
            $sql = 'SELECT codigo, nombre, foto FROM jugadores WHERE 
                Nombre_equipo="Lakers" LIMIT 4';
            $ps = $mysql->prepare($sql);
            $equipo = 'Lakers';
            //$ps->bindParam(':equipo', 'Lakers', PDO::PARAM_STR);
            $ps->execute();
            foreach ($ps->fetchAll(PDO::FETCH_ASSOC) as $row) { 
                //var_dump($row);
                echo "<a href='/jugador/" . $row['codigo'] . "'>";
                echo "<figure class='playersTeam'>";
                echo "<img src='" .  IMAGENES . DS . $row['foto'] . "' />";
                echo "<figcaption>" . $row['nombre'] . "</figcaption></figure></a>";
            }
    ?>      
        <!--<a href="/jugador/1">
            <figure class="playersTeam">
                <img src="<?= IMAGENES . DS?>lonzo-ball.jpg" />
                <figcaption>Lonzo Ball</figcaption>
            </figure>
        </a>
        <a href="/jugador/2">
            <figure class="playersTeam">
            <img src="<?= IMAGENES . DS?>lebron-james.jpg" />
                <figcaption>Lebron James</figcaption>
            </figure>
        </a>
        <a href="/jugador/3">
            <figure class="playersTeam">
                <img src="<?= IMAGENES . DS?>kyle-kuzma.jpg" />
                <figcaption>Kyle Kuzma</figcaption>
            </figure>
        </a>
        <a href="/jugador/4">
            <figure class="playersTeam">
                <img src="<?= IMAGENES . DS?>brandon-ingram.jpg" />
                <figcaption>Brandon Ingram</figcaption>
            </figure>
        </a>
        <a href="/jugador/5">
            <figure class="playersTeam">
                <img src="<?= IMAGENES . DS?>javale-mcgee.jpg" />
                <figcaption>Javale McGee</figcaption>
            </figure>
        </a>-->
    </div>
</div>    
</body>
</html>