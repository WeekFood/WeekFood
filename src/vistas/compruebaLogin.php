<?php
    $user = trim($_POST["user"]);
    $password = $_POST["password"];
    
    //Comprobamos el usuario
    $sql = 'SELECT id, password, avatar, COUNT(1) FROM usuarios  
        WHERE nombreUsuario ="' . $user . '" LIMIT 1';
    foreach ($mysql->query($sql) as $row) {
        if ($row[3] == 0) {
            header("location:" . ROOT2 . DS . "login");
        }
        $passwordBBDD = $row[1];
        if (password_verify($password, $passwordBBDD)) {
            $extension = $row[2];
            setcookie("DWS", $row[0] . ";" . $extension,  time() + (86400 * 7));
            header("location:" . ROOT2);
        } else {
            echo "fasd";
            header("location:" . ROOT2 . DS . "login");
        }
    }


