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
        }, 100)

    } else {
        $(".js-menu").addClass("c-menu--ocultar c-menu--oculto")
    }
});
$(".js-carrito").on('click', carrito_Alternar)
$(".js-acceso").on('click', acceso_Alternar)

var GLOBAL_CACHE_JSONS = new CacheJSONs();
var GLOBAL_GESTOR_PRODUCTOS = new GestorProductos();
var GLOBAL_CARRITO = new Carrito();
var GLOBAL_USUARIO = new Usuario();
iniciarAplicacion(true)