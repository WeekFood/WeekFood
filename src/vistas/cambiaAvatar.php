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

<?php 
    //sacamos el nombre del usuario y la extensión del avatar de la cookie
    $cookie_data = explode(';', $_COOKIE['DWS']);
    $idUser = $cookie_data[0];
    $avatarUserExtension = $cookie_data[1];
    //echo $avatarUser;
    //subimos el nuevo avatar del usuario
    $directorio = "avatares/";
    //le quito la última letra porque inserta un carácter extraño al final
    //$imagen = substr($directorio.$avatarUser, 0, -1);
    $extension = end(explode(".", $_FILES['avatar']['name']));
    //echo $imagen;
    try {
        $sql = 'UPDATE usuarios SET avatar = :extension WHERE id=:idUsuario'; 
        $ps = $mysql->prepare($sql);
        $ps->bindParam(':extension', $extension, PDO::PARAM_STR);
        $ps->bindParam(':idUsuario', $idUser, PDO::PARAM_INT);
        $ps->execute();

        //borrar los demas avatares
        array_map('unlink', glob(AVATARES2 . DS . NOMBREAVATAR . $idUser . ".*"));

        //subir el avatar del usuario
        $avatar = 'avatar' . $idUser . '.' . $extension;
        echo $avatar;
        move_uploaded_file($_FILES["avatar"]["tmp_name"], AVATARES2 . DS . $avatar);

        //actualizar la cookie
        setcookie("DWS", $idUser . ";" . $extension,  time() + (86400 * 7));
    }
    catch (\PDOException $e)  {
        echo $e->getCode();
    }

    header("location:" . ROOT2);
?>
</div>    
</body>
</html>
