function vista_Productos(puntoMontaje, categorias) {
    $.when(() => { if (GLOBAL_VISTA_ACTUAL != "productos") { return montarMenu("/api/menu", "productos") } }).then(() => {
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
                        menuInterno += "<li class='c-menu__item c-menu__sub--2' onclick='cargarVista(\"productos\",{\"categoriaPrincipal\":\"" + categorias["categoriaPrincipal"] + "\",\"categoriaSecundaria\" : \"" + cate["nombre"] + "\"})'>" + cate["nombre"] + "</li>"
                    })
                    $(html.replace("sDE30305Po7HtmTr", menuInterno)).insertAfter(".js-menu-productos")
                })
            } else {

                $(html).insertAfter(".js-menu-productos")
            }
        })
    })
    var html = "";
    var url = "/api/productos"
    if (categorias) {
        if ((categorias.hasOwnProperty("categoriaPrincipal")) && (categorias.hasOwnProperty("categoriaSecundaria"))) { url += "/categorias/" + categorias["categoriaPrincipal"] + "/" + categorias["categoriaSecundaria"] }
    }
    console.log(url)
    return $.when($.getJSON(url).then((productos) => {
        productos.forEach(producto => {
            html += "<div class='c-principal c-producto";
            if (producto["destacado"] == 1) {
                html += " c-producto--destacado'> <img class='c-producto__imagen-destacado' src='imagenes/estrella.png";
            }
            html += "'><img class='c-producto__imagen' src='/imagenes/productos/" + producto["foto"] + "'>";
            html += "<p class='c-producto__titulo'>" + producto["nombre"].charAt(0).toUpperCase() + producto["nombre"].slice(1) + "</p></div>";
        })
    }
    )).then(() => {
        $(puntoMontaje).html(html);
    })
}