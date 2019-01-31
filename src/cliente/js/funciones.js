function cargarVista(vistaACargar, parametro = false) {
    cargarVistaAPunto(vistaACargar, ".l-distribucion__principal", parametro)
}
function cargarVistaAPunto(vistaACargar, puntoMontaje, parametro = false) {
    if (GLOBAL_VISTAS.hasOwnProperty(vistaACargar)) {
        if (typeof (puntoMontaje) == "string") {
            if (GLOBAL_VISTA_ACTUAL != vistaACargar) {
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
    return GLOBAL_CACHE_JSONS.getJSON(url).then(
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
    borrarCookie("Redirect")
    if (url !== null) {
        url = decodeURIComponent(url)
        url = url.split("/")[1].toLowerCase()
        if (GLOBAL_REDIRECCIONES.hasOwnProperty(url)) {
            cargarVista(GLOBAL_REDIRECCIONES[url])
            return true
        }
    }
    return false
}

function extraerCookie(nombre) {
    var encontrada = null
    document.cookie.split("; ").forEach(cookie => {
        if (cookie.split("=")[0] == nombre) {
            encontrada = cookie.split("=")[1];
        }
    })
    return encontrada;
}
function borrarCookie(nombre) {
    document.cookie = nombre + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function crearCookie(nombre, valor) {
    document.cookie = nombre + '=' + valor;
}
function getIDcookie() {
    var token = extraerCookie("token")
    return token.split(".")[0]
}
function precioEnEuros(precio) {
    return (precio / 100).toString() + " €"
}
function precioEnDollar(precio) {
    return (precio / 88).toString() + " $"
}
function precioEnLibra(precio) {
    return (precio * 0.88).toString() + " £"
}
function iniciarAplicacion(primeraVez = false, nuevoUsuario = false) {
    if (!primeraVez) {
        GLOBAL_CACHE_JSONS.vaciar()
        GLOBAL_CARRITO.vaciar()
    }
    acceso_LoginInicial(nuevoUsuario)

    if (!redirigir() && !nuevoUsuario) {
        cargarVista("portada")
    }
}