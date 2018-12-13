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
    <?php
        $key = $keys[0][0];
        $idjugador = $params[$key];
        $sql = 'SELECT * FROM jugadores WHERE codigo=:codigo';
            $ps = $mysql->prepare($sql);
            $ps->bindParam(':codigo', $idjugador, PDO::PARAM_INT);
            $ps->execute();
            echo "<table border='1'>";
            foreach ($ps->fetchAll(PDO::FETCH_ASSOC) as $row) { 
                echo '<tr>';
                echo "<td>" . $row['Nombre'] . "</td>";
                echo "<td>" . $row['Procedencia'] . "</td>";
                echo "<td><img src='"  .  IMAGENES . DS . $row['foto'] . "'></td>";
                echo "<td>" . $row['puntos_visitante'] . "</td></tr>";
            }
            echo "</table>";
        
    ?>
</div>    
</body>
</html>