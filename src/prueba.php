<<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <script src="main.js"></script>
</head>
<body>
    
</body>
</html>
<script>
    $('.playersTeam').on( 'click', function () {
        var equipo = $(this).attr("team");
        sendAjax(equipo, cargarJugadores);
    });

    function cargarJugadores(params) {
        console.dir(params);
    }

    function sendAjax(equipo, callback) {
        var url = 'http://proyecto.test/jugadores/' + equipo;
        console.log(url);
        $.ajax({
            url: url,
            dataType: "json",
            encoding: "UTF-8",
        })
        .success(function(data) {
            callback(data);
        })
        .error(function(data) {
            console.log("ERROR:" + JSON.stringify(data));
            console.log(data["DATA"]);
            //console.log(data);
            console.log("Ajax terminado desde sendAjax con json ERROR: " + data.statusText + " " + data.responseText);
        });
    }

</script>