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