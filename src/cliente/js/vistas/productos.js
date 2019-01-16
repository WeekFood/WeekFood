function vista_Productos(puntoMontaje, categoria) {
    if (GLOBAL_VISTA_ACTUAL != "productos") {
        $.when(montarMenu("/api/menu", "productos")).then(vista_Productos_montarMenu(puntoMontaje, categoria));
    } else {
        vista_Productos_montarMenu(puntoMontaje, categoria);
    }
}

function vista_Productos_montarMenu(puntoMontaje, categoria) {
    if (categoria.hasOwnProperty("nombre")) {
        $(".c-menu__sub").removeClass("c-menu__item--destacado")
        $(".js-menu__productos__" + categoria["nombre"]).addClass("c-menu__item--destacado")
        if ($(".l-distribucion__menu--expandido").length < 1) {
            $(`<div class="l-distribucion__menu--expandido">
            <div class="c-menu-expandido c-menu-expandido--plegado js-menu-expandido"> 
            <div class='c-menu-expandido__borde' onclick='vista_Productos_alternarExtendido()'> 
            <i class='fas fa-angle-right c-menu-expandido__flecha'></i> 
            </div>
            <ul class="c-menu-expandido__listado js-menu-expandido__listado">
            </ul>
            </div></div>`).insertBefore(".l-distribucion__menu")
        }
        GLOBAL_GESTOR_PRODUCTOS.getCategoriasEnCategoriaPrincipal(categoria["nombre"]).then((cates) => {
            var html = "<li>Filtro</li><hr>"
            cates.forEach(cate => {
                html += `<li><input type="checkbox" onclick="vista_Productos__montarContenido('` + puntoMontaje + `')" class="c-menu-expandido__checkbox js-menu-expandido__checkbox__` + cate["nombre"] + `" checked>` + cate["nombre"] + `</li>`
            })
            $(".js-menu-expandido__listado").html(html)
            vista_Productos__montarContenido(puntoMontaje)
        })
    } else {
        if ($(".js-menu-productos__contenedor").length < 1) {
            var contenedorCategoriasPrincipales = "<li class='js-menu-productos__contenedor'><ul>"
            GLOBAL_GESTOR_PRODUCTOS.getCategoriasPrincipales().forEach(cate => {
                var categoriaNueva = `<li class='c-menu__item c-menu__sub js-menu__productos__` + cate["nombre"] + `' onclick='cargarVista("productos",{"nombre" : "` + cate["nombre"] + `"})'>` + cate["nombre"] + `</li>`
                contenedorCategoriasPrincipales += categoriaNueva
            })
            contenedorCategoriasPrincipales += "</ul></li>"
            $(contenedorCategoriasPrincipales).insertAfter(".js-menu-productos")
        } else {
            $(".js-menu-productos__contenedor").remove()
        }
    }
}

function vista_Productos__montarContenido(puntoMontaje) {
    var clases = $(".c-menu__item--destacado").last().attr('class').split("js-menu__productos__")
    var categoriaSeleccionada = clases[clases.length - 1].split(" ")[0]
    GLOBAL_GESTOR_PRODUCTOS.getCategoriasEnCategoriaPrincipal(categoriaSeleccionada).then((cates) => {
        var montados = 0
        $(puntoMontaje).html("");
        cates.forEach(cate => {
            if ($('.js-menu-expandido__checkbox__' + cate["nombre"]).is(':checked')) {
                vista_Productos_cargarDe(puntoMontaje, categoriaSeleccionada, cate["nombre"])
                montados++;
            }
        })
        if (montados < 1) {
            $(puntoMontaje).html("<div class='c-principal'><center><i class='far fa-sad-tear fa-7x'></i><h1 style='margin: 20px 0px'>Vaya, nos hemos quedado sin productos.</h1><h3 class='c-boton c-boton--basico' onclick='vista_Productos_restablecerFiltro(\"" + puntoMontaje + "\")'>Restablecer el filtro</h3></center></div>")
        }
    })
}

function vista_Productos_cargarDe(puntoMontaje, categoriaPrincipal, categoria) {
    if ($('.js-productos-destacados').length < 1) {
        $(puntoMontaje).append("<div class='c-productos js-productos-destacados'></div>")
    } if ($('.js-productos-normales').length < 1) {
        $(puntoMontaje).append("<div class='c-productos js-productos-normales'></div>")
    }
    GLOBAL_GESTOR_PRODUCTOS.getProductosCategoria(categoriaPrincipal, categoria).then((productos) => {
        productos.forEach(producto => {
            if (producto["destacado"] == 1) {
                $('.js-productos-destacados').append(vista_Productos_generarProducto(producto))
            } else {
                $('.js-productos-normales').append(vista_Productos_generarProducto(producto))
            }
        })
        if ($($(".js-productos-destacados")[0]).children().length < 1) {
            console.log("No existen destacados.")
            $(".js-productos-destacados").remove()
        }
    })
}

function vista_Productos_generarProducto(producto) {
    var placeHolderPrecio = 4
    var html = `
    <div class='c-producto'>
        <img class='c-producto__imagen' src='/imagenes/productos/`+ producto["foto"] + `'>`
    if (producto["destacado"] == 1) {
        html += `
        <div class='c-producto__imagen-destacado'>
            <i class='fas fa-star fa-3x'></i>
        </div>
        `
    }
    html += `
        <div class='c-producto__titulo-container'>
            <p class='c-producto__titulo'>
                `+ producto["nombre"].charAt(0).toUpperCase() + producto["nombre"].slice(1) + `
            </p> 
        </div>
        <div class='c-producto__precio'>
            `+ placeHolderPrecio + `€
        </div>
        <div class='c-producto__carrito'>
            <i class='fas fa-cart-plus'></i>
        </div>
    </div>
    `
    return html;
}

function vista_Productos_alternarExtendido() {
    $(".c-menu-expandido__flecha").toggleClass("c-menu-expandido__flecha--plegado").toggleClass("c-menu-expandido__flecha--desplegado")
    if ($(".js-menu-expandido").hasClass("c-menu-expandido--plegado")) {
        $(".js-menu-expandido").removeClass("c-menu-expandido--plegado").addClass("c-menu-expandido--desplegando")
    } else {
        $(".js-menu-expandido").toggleClass("c-menu-expandido--plegando").toggleClass("c-menu-expandido--desplegando")
    }
}

function vista_Productos_restablecerFiltro(puntoMontaje) {
    $(".c-menu__checkbox").prop("checked", true);
    vista_Productos__montarContenido(puntoMontaje)
}