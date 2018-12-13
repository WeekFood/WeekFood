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
    <div id="loginForm">
        <form name="login" action="/compruebaLogin" method="post">
            <input type="text" class="inputAuth" name="user" placeholder="Nombre de usuario" required/>
            <input type="password" class="inputAuth" name="password" placeholder="Password" required/>
            <button id="authButton" type="submit">OK</button>
        </form>
    </div>
</div>    
</body>
</html>