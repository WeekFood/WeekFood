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
    var html = "<div class='c-principal'><div class='c-principal__texto'><h1>Error 404</h1><h2>"
    html += titulosError[Math.floor(Math.random() * titulosError.length)] + "<hr>" + descripcionesError[Math.floor(Math.random() * descripcionesError.length)];
    html += "</h2><div class='c-principal__error-enlace' onclick=cargarVista('portada')>Volver a WeekFood</div></div>"
    $(puntoMontaje).html(html)
    return montarMenu("/api/menu/portada", "error");
}

function vista_Portada(puntoMontaje) {
    
    function generarCarrusel(claseContenedor) {
        var contenido = "";
        var contenedor = document.getElementsByClassName(claseContenedor)[0];
        $.getJSON("/api/carrusel", (datos) => {
            if (datos["error"] == false) {
    
                contenido += "<div class='glide c-carrusel'>";
    
                contenido += "<div class='glide__track c-carrusel__contenedor' data-glide-el='track'>";
    
                contenido += "<ul class='glide__slides c-carrusel__contenedor'>";
                
                for (let index = 0; index < datos["data"].length; index++) {
                    contenido += "<li class='glide__slide c-carrusel__imagen'>";
                    contenido += "<img src='imagenes/productos/" + datos["data"][index]["foto"] + "'>";
                    contenido += "</li>";
                }
                contenido += "</ul></div></div>";
                contenedor.innerHTML = contenido;
                new Glide('.glide', {
                    type: 'carousel',
                    autoplay: 1,
                    animationDuration: 5000,
                    hoverpause: false,
                    perView: 3,
                    gap: 0,
                    animationTimingFunc: 'linear'
                }).mount()
            }
        })
    }

    $(puntoMontaje).html("<div class='c-principal'><div class='js-carrusel'></div><div class='c-principal__texto'><h1>¡Bienvenido a <span class='c-logo__parte'>Week</span><span class='c-logo__parte c-logo__parte--alterna'>Food</span>!</h1>Somos una empresa ficticia, ofrecemos gran variedad de platos preparados para entrega en el hogar, el trabajo, o la escuela.<br>Con <span class='c-logo__parte'>Week</span><span class='c-logo__parte c-logo__parte--alterna'>Food</span> nunca mas tendrás que preocuparte de que vas a comer hoy.</div></div>")
    montarMenu("/api/menu/portada", "portada")
    return $.when($.getScript("libs/glide-3.2.4/glide.min.js")).then(() => { generarCarrusel("js-carrusel") })
}

function vista_Productos(puntoMontaje) {
    montarMenu("/api/menu/portada", "productos")
    var html = "";
    return $.when($.getJSON("/api/productos").then((datos) => {
        datos["data"].forEach(producto => {
            html += "<div class='c-principal c-producto";
            if (producto["destacado"] == 1) {
                html += " c-producto--destacado'> <img class='c-producto__imagen-destacado' src='imagenes/estrella.png";
            }
            html += "'><img class='c-producto__imagen' src='/imagenes/productos/" + producto["foto"] + "'>";
            html += "<p class='c-producto__titulo'>" + producto["nombre"].charAt(0).toUpperCase() + producto["nombre"].slice(1) + "</p></div>";
        })
    }
    )).then(() => {
        $(puntoMontaje).html(html);
    })

}