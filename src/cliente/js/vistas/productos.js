function vista_Productos(puntoMontaje, categorias) {
    if (GLOBAL_VISTA_ACTUAL != "productos") {
        $.when(montarMenu("/api/menu", "productos")).then(vista_Productos_montarMenu(categorias));
    } else {
        vista_Productos_montarMenu(categorias);
    }
    /*
    var url = "/api/productos"
    if (categorias) {
        if ((categorias.hasOwnProperty("categoriaPrincipal")) && (categorias.hasOwnProperty("categoria"))) { url += "/categorias/" + categorias["categoriaPrincipal"] + "/" + categorias["categoria"] }
    }
    $(puntoMontaje).html("")
    vista_Productos_cargarDe(puntoMontaje, url)
    */
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
    /*
    $.getJSON("/api/productos/categorias/").then((cates) => {
        var html = ""
        cates.forEach(cate => {
            html += "<li class='c-menu__item c-menu__sub' onclick='cargarVista(\"productos\",{\"categoriaPrincipal\" : \"" + cate["nombre"] + "\"})'>" + cate["nombre"] + "</li>"
            if (categorias) {
                if (categorias["categoriaPrincipal"] == cate["nombre"]) {
                    html += "sDE30305Po7HtmTr" //esto sirve para guardar el sitio al menu interno
                }
            }
        })
        if (categorias) {
            $.getJSON("/api/productos/categorias/" + categorias["categoriaPrincipal"]).then((cates) => {
                var menuInterno = ""
                cates.forEach(cate => {
                    menuInterno += "<li class='c-menu__item c-menu__sub--2' onclick='cargarVista(\"productos\",{\"categoriaPrincipal\":\"" + categorias["categoriaPrincipal"] + "\",\"categoria\" : \"" + cate["nombre"] + "\"})'>" + cate["nombre"] + "</li>"
                })
                $(html.replace("sDE30305Po7HtmTr", menuInterno)).insertAfter(".js-menu-productos")
            })
        } else {

            $(html).insertAfter(".js-menu-productos")
        }
    })*/
    if (categorias.hasOwnProperty("categoriaPrincipal")) {
        var nombreContenedor = "js-menu-productos__contenedor-secundario__" + categorias["categoriaPrincipal"]
        if ($("." + nombreContenedor).length < 1) {
            var nombreListado = "js-menu-productos__listado__" + categorias["categoriaPrincipal"]
            var contenedorCategoriasSecundariaas = "<li class='" + nombreContenedor + "'><ul class='" + nombreListado + "'>"
            contenedorCategoriasSecundariaas += "</ul></li>"
            $(contenedorCategoriasSecundariaas).insertAfter(".js-menu__productos--" + categorias["categoriaPrincipal"])
            $.getJSON("/api/productos/categorias/" + categorias["categoriaPrincipal"]).then((cates) => {
                cates.forEach(cate => {
                    var categoriaNueva = `<li class='c-menu__item c-menu__sub--2 js-menu__productos__` + categorias["categoriaPrincipal"] + `--` + cate["nombre"] + `'
                    onclick='cargarVista("productos",{"categoriaPrincipal" : "` + categorias["categoriaPrincipal"] + `","subCategoria":"` + cate["nombre"] + `"})'
                    >` + cate["nombre"] + `</li>`
                    $("." + nombreListado).append(categoriaNueva)
                    console.log(nombreListado)
                })
            })
        }else{
            $("."+nombreContenedor).remove()
        }
    } else {
        if ($(".js-menu-productos__contenedor").length < 1) {
            $.getJSON("/api/productos/categorias/").then((cates) => {
                var contenedorCategoriasPrincipales = "<li class='js-menu-productos__contenedor'><ul>"
                cates.forEach(cate => {
                    var categoriaNueva = `<li class='c-menu__item c-menu__sub js-menu__productos--` + cate["nombre"] + `' onclick='cargarVista("productos",{"categoriaPrincipal" : "` + cate["nombre"] + `"})'>` + cate["nombre"] + `</li>`
                    contenedorCategoriasPrincipales += categoriaNueva
                })
                contenedorCategoriasPrincipales += "</ul></li>"
                $(contenedorCategoriasPrincipales).insertAfter(".js-menu-productos")
            })
        }
    }
}