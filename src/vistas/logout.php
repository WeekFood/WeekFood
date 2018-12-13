<?php
    //borramos la cookie
    setcookie("DWS", null, -1); 
    //redirigimos al index
    header("location:" . ROOT2); 
