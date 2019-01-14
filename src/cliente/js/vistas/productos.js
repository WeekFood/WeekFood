function vista_Productos(puntoMontaje, categorias) {
    if (GLOBAL_VISTA_ACTUAL != "productos") {
        $.when(montarMenu("/api/menu", "productos")).then(vista_Productos_montarMenu(categorias));
    } else {
        vista_Productos_montarMenu(categorias);
    }
    $(puntoMontaje).html("")
    var url = "/api/productos"
    if (categorias) {
        if (categorias.hasOwnProperty("subCategoria")) {
            url += "/categorias/" + categorias["categoria"] + "/" + categorias["subCategoria"]
            vista_Productos_cargarDe(puntoMontaje, url)
        } else {
            url += "/categorias/"
            $.getJSON(url + categorias["categoria"]).then((cates) => {
                cates.forEach(cate => {
                    vista_Productos_cargarDe(puntoMontaje, url + categorias["categoria"] + "/" + cate["nombre"])
                })
            })
        }
    } else {
        vista_Productos_cargarDe(puntoMontaje, url)
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
function vista_Productos_montarMenu(categorias) {
    if (categorias.hasOwnProperty("categoria")) {
        if (!categorias.hasOwnProperty("subCategoria")) {
            var nombreContenedor = "js-menu-productos__contenedor-secundario__" + categorias["categoria"]
            if ($("." + nombreContenedor).length < 1) {
                var nombreListado = "js-menu-productos__listado__" + categorias["categoria"]
                var contenedorCategoriasSecundariaas = "<li class='" + nombreContenedor + "'><ul class='" + nombreListado + "'>"
                contenedorCategoriasSecundariaas += "</ul></li>"
                $(contenedorCategoriasSecundariaas).insertAfter(".js-menu__productos--" + categorias["categoria"])
                $.getJSON("/api/productos/categorias/" + categorias["categoria"]).then((cates) => {
                    cates.forEach(cate => {
                        var categoriaNueva = `<li class='c-menu__item c-menu__sub--2 js-menu__productos__` + categorias["categoria"] + `--` + cate["nombre"] + `'
                        onclick='cargarVista("productos",{"categoria" : "` + categorias["categoria"] + `","subCategoria":"` + cate["nombre"] + `"})'
                        >` + cate["nombre"] + `</li>`
                        $("." + nombreListado).append(categoriaNueva)
                    })
                })
            } else {
                $("." + nombreContenedor).remove()
            }
        }
    } else {
        if ($(".js-menu-productos__contenedor").length < 1) {
            $.getJSON("/api/productos/categorias/").then((cates) => {
                var contenedorCategoriasPrincipales = "<li class='js-menu-productos__contenedor'><ul>"
                cates.forEach(cate => {
                    var categoriaNueva = `<li class='c-menu__item c-menu__sub c-menu__item--plegado js-menu__productos--` + cate["nombre"] + `' onclick='cargarVista("productos",{"categoria" : "` + cate["nombre"] + `"})'>` + cate["nombre"] + `</li>`
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