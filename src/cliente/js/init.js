$(".js-menu").on('webkitAnimationEnd oanimationEnd msAnimationEnd animationend', () => {
    if ($('.js-menu').hasClass('c-menu--oculto')) {
        for (var x = 0; x < $(".js-menu__lista")[0].childElementCount; x++) {
            $($(".js-menu__lista").children()[x]).addClass("c-menu__item--oculto").removeClass("c-menu__item--descubrir")
        }
    }
})

$('.js-boton-menu').on('click', () => {
    $(".js-menu").removeClass("c-menu--descubrir");

    if ($('.js-menu').hasClass('c-menu--oculto')) {
        $(".js-menu").removeClass("c-menu--oculto c-menu--ocultar").addClass("c-menu--descubrir")
        x = 0
        var modificarListado = setInterval(() => {
            if (x < $(".js-menu__lista")[0].childElementCount) {
                $($(".js-menu__lista").children()[x]).removeClass("c-menu__item--oculto").addClass("c-menu__item--descubrir")
                x++
            } else {
                clearInterval(modificarListado);
            }
        }, 175)

    } else {
        $(".js-menu").addClass("c-menu--ocultar c-menu--oculto")
    }
});

if (!redirigir()) {
    cargarVista("portada")
}

/* PRUEBAS CARRITO */

let carrito = new Carrito();

let productoDesdeAPI = new Producto(
    1,
    'Patatas fritas',
    'patatas-fritas.png',
    false
);

function _tmpCarritoArticulos() {
    console.log(
        JSON.parse(
            JSON.stringify(carrito.articulos)
        )
    );
}

carrito.añadirProducto(productoDesdeAPI);

_tmpCarritoArticulos()

let idArticulo = carrito.añadirProducto(productoDesdeAPI);

carrito.incrementarCantidad(idArticulo);
console.log(carrito.getArticulo(idArticulo));

carrito.incrementarCantidad(idArticulo);
console.log(carrito.getArticulo(idArticulo));

carrito.decrementarCantidad(idArticulo);
console.log(carrito.getArticulo(idArticulo));


_tmpCarritoArticulos()

carrito.quitarArticulo(idArticulo);


_tmpCarritoArticulos()

/* END PRUEBAS CARRITO */