function cargarVista(vistaACargar) {
    cargarVistaAPunto(vistaACargar, ".l-distribucion__principal")
}
function cargarVistaAPunto(vistaACargar, puntoMontaje) {
    if (vistas.hasOwnProperty(vistaACargar)) {
        if (typeof (puntoMontaje) == "string") {
            vistas[vistaACargar](puntoMontaje)
        } else {
            console.error("Error intentando cargar " + vistaACargar + " : El punto de montaje no es valido.")
        }

    } else {
        cargarVistaAPunto('error', puntoMontaje)
    }
}

function montarMenu(url, vista) {
    return $.getJSON(url).then(
        (items) => {
            var menu = ""
            items.forEach(item => {
                menu += "<li class='c-menu__item"
                if ($('.js-menu').hasClass('c-menu--oculto')) {
                    menu += " c-menu__item--oculto"
                }
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

function redirigir() {
    var url = extraerCookie("Redirect")
    if (url !== null) {
        url = decodeURIComponent(url.split("=")[1])
        url = url.split("/")[1]
        cargarVista(url)
        borrarCookie("Redirect")
        return true
    }
}

function extraerCookie(nombre) {
    var encontrada = null
    document.cookie.split("; ").forEach(cookie => {
        if (cookie.split("=")[0] == nombre) {
            encontrada = cookie;
        }
    })
    return encontrada;
}
function borrarCookie(nombre) {
    document.cookie = nombre + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
