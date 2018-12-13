<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Registrarse</title>
    <link rel="stylesheet" type="text/css" media="screen" href="<?=CSS . DS?>estilos.css" />
</head>
<body>
<?php
    include "menu.php";
?>
<div id="content">
<?php
    if (isset($_POST['user'])) {
        //comprobar que las contraseñas coinciden
        $pass1 = $_POST['password'];
        $pass2 = $_POST['password2'];
        $username = $_POST['user'];
        $extension = end(explode(".", $_FILES['avatar']['name']));
        if (strcmp($pass1, $pass2) == 0) {
            $password = crypt($pass1);
            try {
                $sql = 'INSERT INTO usuarios (nombreusuario, password, avatar) 
                    VALUES (:user, :pass, :extension)';
                $ps = $mysql->prepare($sql);
                $ps->bindParam(':user', $username, PDO::PARAM_STR);
                $ps->bindParam(':pass', $password, PDO::PARAM_STR);
                $ps->bindParam(':extension', $extension, PDO::PARAM_STR);
                $ps->execute();
                $idUser = $mysql->lastInsertId();

                //subir el avatar del usuario
                $avatar = 'avatar' . $idUser . '.' . $extension;
                move_uploaded_file($_FILES["avatar"]["tmp_name"], AVATARES2 . DS . $avatar);
            }
            catch (\PDOException $e)  {
                if ($e->getCode() == 23000)
                    echo 'El usuario ya existe en la bbdd';
                    else 
                        echo "ERROR desconocido ";
            }
        } else {
            echo "Las contraseñas no coinciden";
        }
        
    }

?>
    <div id="loginForm">
        <form enctype ="multipart/form-data" name="login" action="/registrarse" method="post">
            <input type="text" class="inputAuth" name="user" placeholder="Nombre de usuario" required/>
            <input type="password" class="inputAuth" name="password" placeholder="Password" required/>
            <input type="password" class="inputAuth" name="password2" placeholder="Repite password" required/>
            <input type="file" name="avatar" required/>
            <button id="authButton" type="submit">OK</button>
        </form>
    </div>
</div>    
</body>
</html>