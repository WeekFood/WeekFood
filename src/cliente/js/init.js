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
var GLOBAL_GESTOR_PRODUCTOS = new GestorProductos();

if (!redirigir()) {
    cargarVista("portada")
}

// Codigo con propositos de testeo {
// Estos no se cargan al entrar a la web
try{
console.log("Principales",GLOBAL_GESTOR_PRODUCTOS.getCategoriasPrincipales())
}catch(e){
    console.error("No se ha podido hacer una peticion de principales antes de tiempo:",e)
}
try{
    GLOBAL_GESTOR_PRODUCTOS.getCategoriasEnCategoriaPrincipal('Carnes').then((categorias)=>{console.log("En carnes",categorias)})
}catch(e){
    console.error("No se ha podido hacer una peticion de principales antes de tiempo:",e)
}
// Este si
GLOBAL_GESTOR_PRODUCTOS.getProductosCategoria('Huevos','Tortilla').then((productos) => {console.log("Tortillas",productos)})
// En vistas/producto hay un ejemplo de cargar al llegar a dicha vista.

// } Codigo con propositos de testeo 
