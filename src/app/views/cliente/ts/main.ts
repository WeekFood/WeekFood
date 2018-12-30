$('.js-boton-menu').on('click', () => {
    $('.js-menu').toggleClass('c-menu--oculto');
});
$('.js-menu__flecha').on('click', () => {
    $('.js-menu__lista').toggleClass('c-menu__lista--oculto');
    $('.c-menu__flecha').toggleClass('c-menu__flecha--oculto');
    $('.l-distribucion').toggleClass('l-distribucion--menu-desplegado');
})
var vistas = {
    error: {
        procesado: (datos) => {
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
            $(".l-distribucion__principal").html(html)
        }
    },
    portada: {
        url: "/api/portada",
        menu: "/api/menu/portada",
        scripts: ["js/libs/glide-3.2.4/glide.min.js"],
        procesado: (datos) => { $(".l-distribucion__principal").html("<div class='c-principal'><div class='js-carrusel'></div><h1>¡Bienvenido a <span class='c-logo__parte'>Week</span><span class='c-logo__parte c-logo__parte--alterna'>Food</span>!</h1>Somos una empresa ficticia, ofrecemos gran variedad de platos preparados para entrega en el hogar, el trabajo, o la escuela.<br>Con <span class='c-logo__parte'>Week</span><span class='c-logo__parte c-logo__parte--alterna'>Food</span> nunca mas tendrás que preocuparte de que vas a comer hoy.<div class='c-principal__texto'></div></div>") },
        postProcesado: () => { generarCarrusel("js-carrusel") },
    },
    productos: {
        url: "/api/productos",
        menu: "/api/menu/portada",
        procesado: (datos) => {
            var html = "";
            datos["data"].forEach(producto => {
                html += "<div class='c-principal c-producto";
                if (producto["destacado"] == 1) {
                    html += " c-producto--destacado'> <img class='c-producto__imagen-destacado' src='imagenes/estrella.png";
                }
                html += "'><img class='c-producto__imagen' src='/imagenes/productos/" + producto["foto"] + "'>";
                html += "<p class='c-producto__titulo'>" + producto["nombre"].charAt(0).toUpperCase() + producto["nombre"].slice(1) + "</p></div>";
            })
            $(".l-distribucion__principal").html(html);
        },
    }
}

cargarVista('portada')

function cargarVista(vista) {
    if (vistas.hasOwnProperty(vista)) {
        if (vistas[vista].hasOwnProperty("scripts")) {
            vistas[vista]["scripts"].forEach(script => { $.getScript(script) })
        }
        if (vistas[vista].hasOwnProperty("menu")) {
            montarMenu(vistas[vista]["menu"], vista)
        } else {
            montarMenu("/api/menu/portada", vista)
        }
        if (vistas[vista].hasOwnProperty("url")) {
            $.when(montarVista(vistas[vista]["url"], vista, vistas[vista]["procesado"])).then(() => {
                if (vistas[vista].hasOwnProperty("postProcesado")) {
                    vistas[vista]["postProcesado"]()
                }
            });
        }
        else {
            if (vistas[vista].hasOwnProperty("procesado")) {
                vistas[vista]["procesado"]()
            }
            if (vistas[vista].hasOwnProperty("postProcesado")) {
                vistas[vista]["postProcesado"]()
            }
        }
    } else {
        cargarVista('error')
    }
}

function montarVista(url, vista, procesado) {
    return $.getJSON(url).then(
        (datos) => {
            procesado(datos)
        }
    )
}

function montarMenu(url, vista) {
    return $.getJSON(url).then(
        (datos) => {
            var menu = ""
            datos["data"].forEach(item => {
                menu += "<li class='c-menu__item"
                if (item["direccion"] == vista) {
                    menu += " c-menu__item--destacado"
                }
                menu += "' onclick='cargarVista(\"" + item["direccion"] + "\")'>" + item["valor"] + "</li>"
            });
            $(".js-menu__lista").html(menu)
            return true
        }
    )

}