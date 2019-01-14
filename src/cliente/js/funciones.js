function cargarVista(vistaACargar, parametro = false) {
    cargarVistaAPunto(vistaACargar, ".l-distribucion__principal", parametro)
}
function cargarVistaAPunto(vistaACargar, puntoMontaje, parametro = false) {
    if (GLOBAL_VISTAS.hasOwnProperty(vistaACargar)) {
        if (typeof (puntoMontaje) == "string") {
            if ($(".l-distribucion").hasClass("l-distribucion--expandido")) {
                $(".l-distribucion").removeClass("l-distribucion--expandido")
                $(".l-distribucion__menu--expandido").remove()
            }
            GLOBAL_VISTAS[vistaACargar](puntoMontaje, parametro)
            GLOBAL_VISTA_ACTUAL = vistaACargar;
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
                if (item["direccion"] == "productos") {
                    menu += " js-menu-productos"
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
