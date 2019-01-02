var vistas = {
    error: vista_Error,
    portada: vista_Portada,
    productos: vista_Productos
}

function cargarVista(vistaACargar) {
    cargarVistaAPunto(vistaACargar, ".l-distribucion__principal")
}
function cargarVistaAPunto(vistaACargar : string, puntoMontaje : string) {
    if (vistas.hasOwnProperty(vistaACargar)) {
        if (typeof (puntoMontaje) == "string") {
            desplegarPanelCarga()
            $.when(vistas[vistaACargar](puntoMontaje)).then(eliminarPanelCarga);
        } else {
            console.error("Error intentando cargar " + vistaACargar + " : El punto de montaje no es valido.")
        }

    } else {
        cargarVistaAPunto('error', puntoMontaje)
    }
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

function desplegarPanelCarga() {
    // Todo Toni : Pre-Sprint 2
}
function eliminarPanelCarga() {
    // Todo Toni : Pre-Sprint 2
}

$('.js-boton-menu').on('click', () => {
    $('.js-menu').toggleClass('c-menu--oculto');
});

cargarVista("portada")