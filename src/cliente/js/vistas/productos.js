function vista_Productos(puntoMontaje, categoria) {
    if (GLOBAL_VISTA_ACTUAL != "productos") {
        $.when(montarMenu("/api/menu", "productos")).then(vista_Productos_montarMenu(puntoMontaje, categoria));
    } else {
        vista_Productos_montarMenu(puntoMontaje, categoria);
    }
}
function vista_Productos_cargarDe(puntoMontaje, url) {
        $.getJSON(url).then((productos) => {
        productos.forEach(producto => {
            var html = "";
            html += "<div class='c-principal c-producto";
            if (producto["destacado"] == 1) {
                html += " c-producto--destacado'> <img class='c-producto__imagen-destacado' src='imagenes/estrella.png";
            }
            html += "'><img class='c-producto__imagen' src='/imagenes/productos/" + producto["foto"] + "'>";
            html += "<p class='c-producto__titulo'>" + producto["nombre"].charAt(0).toUpperCase() + producto["nombre"].slice(1) + "</p></div>";
            $(puntoMontaje).append(html);
        })
    })
}
function vista_Productos_montarMenu(puntoMontaje, categoria) {
    if (categoria.hasOwnProperty("nombre")) {
        $(".c-menu__sub").removeClass("c-menu__item--destacado")
        $(".js-menu__productos__" + categoria["nombre"]).addClass("c-menu__item--destacado")
        $('<div class="l-distribucion__menu--expandido"><div class="c-menu c-menu--desplegado c-menu--oculto js-menu-expandido"></div></div>').insertBefore(".l-distribucion__menu")
        $.getJSON("/api/productos/categorias/" + categoria["nombre"]).then((cates) => {
            var html = "<ul style='width:200px'>"
            cates.forEach(cate => {
                html += `<li><input type="checkbox" onclick="vista_Productos__montarContenido('` + puntoMontaje + `')" class="c-menu__checkbox js-menu__expandido__checkbox__` + cate["nombre"] + `" checked>` + cate["nombre"] + `</li>`
            })
            html += "</ul><div class='c-menu__borde' onclick='vista_Productos_alternarExtendido()'><i class='fas fa-angle-left c-menu__flecha'></i></div>"
            $(".js-menu-expandido").html(html)
            vista_Productos__montarContenido(puntoMontaje)
        })
    } else {
        if ($(".js-menu-productos__contenedor").length < 1) {
            $.getJSON("/api/productos/categorias/").then((cates) => {
                var contenedorCategoriasPrincipales = "<li class='js-menu-productos__contenedor'><ul>"
                cates.forEach(cate => {
                    var categoriaNueva = `<li class='c-menu__item c-menu__sub js-menu__productos__` + cate["nombre"] + `' onclick='cargarVista("productos",{"nombre" : "` + cate["nombre"] + `"})'>` + cate["nombre"] + `</li>`
                    contenedorCategoriasPrincipales += categoriaNueva
                })
                contenedorCategoriasPrincipales += "</ul></li>"
                $(contenedorCategoriasPrincipales).insertAfter(".js-menu-productos")
            })
        } else {
            $(".js-menu-productos__contenedor").remove()
        }
    }
}

function vista_Productos__montarContenido(puntoMontaje) {
    var clases = $(".c-menu__item--destacado").last().attr('class').split("js-menu__productos__")
    var categoriaSeleccionada = clases[clases.length - 1].split(" ")[0]
    $.getJSON("/api/productos/categorias/" + categoriaSeleccionada).then((cates) => {
        var url = "/api/productos/categorias/" + categoriaSeleccionada + "/"
        $(puntoMontaje).html("");
        cates.forEach(cate => {
            if ($('.js-menu__expandido__checkbox__' + cate["nombre"]).is(':checked')) {
                vista_Productos_cargarDe(puntoMontaje, url + cate["nombre"])
            }
        })
    })
}
function vista_Productos_alternarExtendido() {
    $(".js-menu-expandido").toggleClass("c-menu--desplegado").toggleClass("c-menu--plegado")
    $(".c-menu__flecha").toggleClass("c-menu__flecha--plegado")
}