<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>WeekFood</title>
    <link rel="stylesheet" type="text/css" href="css/estilo.css">
    <link href="https://fonts.googleapis.com/css?family=Happy+Monkey" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="shortcut icon" href="imagenes/WeekFoodLogo_512x512.png" type="image/x-icon">
    <script src="js/script.js">
    </script>
</head>

<body>
    <div id="js-grid" class="c-distribucion">
        <div id="cabecera" class="c-distribucion__cabecera c-cabecera c-caja__top-left">
            <a href="index.html" class="c-cabecera__home">
                <span class="c-cabecera__logo__grande">
                    <h1 class="WeekFood">Week</h1>
                    <h1 class="WeekFood WeekFood_Food">Food</h1>
                </span>
                <span class="c-cabecera__logo__movil">
                    <h1 class="WeekFood">W</h1>
                    <h1 class="WeekFood WeekFood_Food">F</h1>
                </span>
            </a>
            <div class="c-cabecera__iconos-der">
                <i class="far fa-user-circle fa-2x"></i>
                <i class="fas fa-users fa-2x"></i>
                <i class="fas fa-utensils fa-2x"></i>
            </div>
            <div class="c-cabecera__iconos-der--pequeños">
                <i class="far fa-user-circle"></i>
                <i class="fas fa-users"></i>
                <i class="fas fa-utensils"></i>
            </div>
        </div>
        <div class="c-distribucion__menu c-caja__top--mantenerBordes c-menu">
            <ul id="js-menu__listado" class="c-menu__listado">
                <span id="js-menu__hamburgesa" class="c-menu__hamburgesa">
                    <i class="fas fa-bars"></i>
                </span>
                <span id="js-menu__circulo" class="c-menu__circulo--oculto">
                    <i class="far fa-times-circle"></i>
                </span>
                <li class="c-menu__item c-menu__seleccionado">
                    Inicio</li>
                <li class="c-menu__item">Login / Registro</li>
                <li class="c-menu__item c-menu__separador"></li>
                <li class="c-menu__item">
                    <a href="productos.html">Productos</a>
                </li>
                <li class="c-menu__item">Ofertas</li>
            </ul>
        </div>
        <main class="c-distribucion__principal c-principal">
        </main>
        <div class="c-distribucion__pie c-pie l-pie">
            <div class="c-pie__contenido">
                ©
                <h1 class="WeekFood">Week</h1>
                <h1 class="WeekFood WeekFood_Food">Food</h1>
                2018-2019
            </div>
        </div>
    </div>
</body>

</html>