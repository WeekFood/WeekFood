<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Preferencias</title>
    <link rel="stylesheet" type="text/css" media="screen" href="<?=CSS . DS?>estilos.css" />
</head>
<body>
<?php
    include "menu.php";
?>
<div id="content">
    <div id="preferenciasForm">
        <form enctype ="multipart/form-data" name="preferencias" action="/cambiaAvatar" method="post">
            <input type="file" class="inputAuth" name="avatar" />
            <button id="authButton" type="submit">OK</button>
        </form>
    </div>
</div>    
</body>
</html>
