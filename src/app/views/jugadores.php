<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Portada</title>
    <link rel="stylesheet" type="text/css" media="screen" href="<?=CSS . DS?>estilos.css" />
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
</head>
<body>
<?php
    include "menu.php";
?>
<div id="content">
    <div id="teams">
        <span class="playersTeam" team="Lakers">Lakers</span>
        <span class="playersTeam" team="Bulls">Bulls</span>
        <span class="playersTeam" team="76ers">76ers</span>
    </div>
    <div id="players">  
    <?php
        foreach ($this->data["data"] as $row) {
            echo "<a href='/jugador/" . $row['codigo'] . "'>";
            echo "<figure class='playersTeam'>";
            echo "<img src='" .  IMAGENES . DS . $row['foto'] . "' />";
            echo "<figcaption>" . $row['nombre'] . "</figcaption></figure></a>";
        }
    ?>      
    </div>
</div>    
</body>
</html>

<script>
    $('.playersTeam').on( 'click', function () {
        var equipo = $(this).attr("team");
        sendAjax(equipo);
    });

    function sendAjax(equipo) {
        var url = 'http://proyecto.test/jugadores/' + equipo;
        console.log(url);
        $.ajax({
            url: url,
            dataType: "json",
            encoding: "UTF-8",
        })
        .success(function(data) {
            console.dir(data);
        })
        .error(function(data) {
            console.log("ERROR:" + JSON.stringify(data));
            console.log(data["DATA"]);
            //console.log(data);
            console.log("Ajax terminado desde sendAjax con json ERROR: " + data.statusText + " " + data.responseText);
        });
    }

</script>