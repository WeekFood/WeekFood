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
cargarVista("portada")
generarVentanaModal({
    tipo: "confirmacion",
    contenido : "<h1> Este es el contenido de la ventana modal</h1><h3>Mola, eh?</h3>",
    callback_Confirmar : ()=>{alert("el usuario ha confirmado")},
    callback_Denegar : ()=>{alert("el usuario ha cancelado")},
    callback_Cerrar : ()=>{alert("el usuario ha cerrado")},
    equis : true
})