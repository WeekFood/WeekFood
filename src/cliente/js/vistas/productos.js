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
        if (!$(".l-distribucion").hasClass("l-distribucion--expandido")) {
            $(".l-distribucion").addClass("l-distribucion--expandido");
        }
        $(".c-menu__sub").removeClass("c-menu__item--destacado")
        $(".js-menu__productos__" + categorias["categoria"]).addClass("c-menu__item--destacado")
        $('<div class="l-distribucion__menu--expandido"><div class="c-menu c-menu--oculto js-menu-expandido"></div></div>').insertAfter(".l-distribucion__menu")

    } else {
        if ($(".js-menu-productos__contenedor").length < 1) {
            $.getJSON("/api/productos/categorias/").then((cates) => {
                var contenedorCategoriasPrincipales = "<li class='js-menu-productos__contenedor'><ul>"
                cates.forEach(cate => {
                    var categoriaNueva = `<li class='c-menu__item c-menu__sub js-menu__productos__` + cate["nombre"] + `' onclick='cargarVista("productos",{"categoria" : "` + cate["nombre"] + `"})'>` + cate["nombre"] + `</li>`
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