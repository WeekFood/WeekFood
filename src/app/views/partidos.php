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
    try {
        $mysql = new PDO("mysql:dbname=nba;host=localhost", "profesor", "profesor");
        $mysql->exec("set names utf8");
        $mysql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo "<p>Error: Cannot connect to database server.</p>\n";
        echo $e;
        exit();
    }

    $sql = 'SELECT distinct(temporada) FROM partidos ORDER BY temporada';

?>
<div id="content">
    <form action="#" method="post">
        <select name="temporada">
        <?php
        foreach ($mysql->query($sql) as $row) { 
            //var_dump($row);
            echo "<option>" . $row['temporada'] . "</option>";
        }
        ?>
        </select>
        <input type="submit" value="OK">
    </form>
    <?php
    if(isset($_POST['temporada'])) {
        $sql = 'SELECT equipo_local, equipo_visitante, puntos_local, 
            puntos_visitante FROM partidos WHERE (equipo_local="LAKERS" 
            OR equipo_visitante="LAKERS") AND temporada=:temporada';
            $ps = $mysql->prepare($sql);
            $ps->bindParam(':temporada', $_POST["temporada"], PDO::PARAM_STR);
            $ps->execute();
            echo "<table border='1'>";
            foreach ($ps->fetchAll(PDO::FETCH_ASSOC) as $row) { 
                echo '<tr>';
                echo "<td>" . $row['equipo_local'] . "</td>";
                echo "<td>" . $row['equipo_visitante'] . "</td>";
                echo "<td>" . $row['puntos_local'] . "</td>";
                echo "<td>" . $row['puntos_visitante'] . "</td></tr>";
            }
            echo "</table>";
    }
    ?>
</div>    
</body>
</html>