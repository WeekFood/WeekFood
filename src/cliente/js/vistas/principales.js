/*
En este archivo irán solo las vistas principales / unicas de la web.
las vistas que desciendan de otra, deberán ir junto a su padre en un nuevo script

Todas las vistas deben llamarse vista_[Nombrevista]
En caso de ser hija vista_[Nombrepadre][Nombrehija]

Todas deben tener argumento string el cual sera el punto de montaje
*/
function vista_Error(puntoMontaje) {
    var titulosError = [
        "Vaya, un callejón sin salida.",
        "Si no miras no está.",
        "Página no encontrada.",
        "No podemos ayudarte.",
        "¡Croquetas! una página que no existe.",
        "Parece ser que te has perdido.",
        "Tranquil@, sólo es un 404."
    ]
    var descripcionesError = [
        "Ni siquiera en nuestro ámplio catálogo hemos podido encontrar lo que buscabas.",
        "(Esto es toooodo WeekFood)(Aqui estás tú)<br><br>Perdona por las molestias.",
        "¡Sorpresa! Esto no es un easter egg...<br>Pero puedes volver a WeekFood y seguir buscandolo.",
        "Oh no, has llegado a la trastienda. Porfavor regresa a WeekFood.",
        "Somos incapaces de encontrar lo que buscabas.",
        "Perdona las molestias.",
        "Woops",
        "Uy, necesitas una mano?<br>Pista: Regresa a WeekFood.",
        "Algun diseñador con hambre se ha debido de comer la página que buscabas..."
    ]
    var html = "<div class='c-final'><div class='c-final__texto'><i class='far fa-sad-tear fa-7x c-final__emoticono'></i><h2 class='c-final__cabecera c-final__cabecera--sub-cabecera'>"
    html += titulosError[Math.floor(Math.random() * titulosError.length)] + "<hr>" + descripcionesError[Math.floor(Math.random() * descripcionesError.length)];
    html += "</h2><div class='c-boton c-final__boton' onclick=cargarVista('portada')>Volver a WeekFood</div></div>"
    $(puntoMontaje).html(html)
    return montarMenu("/api/menu", "error");
}

function vista_Portada(puntoMontaje) {
    $(puntoMontaje).html("<div class='c-principal'><div class='js-carrusel'></div><div class='c-principal__texto'></i><h1 class='c-principal__cabecera'>¡Bienvenido a <span class='c-logo__parte'>Week</span><span class='c-logo__parte c-logo__parte--alterna'>Food</span>!</h1>Somos una empresa ficticia, ofrecemos gran variedad de platos preparados para entrega en el hogar, el trabajo, o la escuela.<br><br>Con <span class='c-logo__parte'>Week</span><span class='c-logo__parte c-logo__parte--alterna'>Food</span> nunca mas tendrás que preocuparte de que vas a comer hoy.</div></div>")
    montarMenu("/api/menu", "portada")
    return $.when($.getScript("libs/slick-1.8.1/slick.min.js")).then(() => { generarCarrusel(".js-carrusel") })
}