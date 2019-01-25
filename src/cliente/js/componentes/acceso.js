function acceso_Alternar() {
    if ($(".c-acceso").length < 1) {
        $(".p-principal").prepend(`<div class='c-acceso'></div>`)
        $(".c-cabecera__botones").prepend('<div class="c-cabecera__boton js-registro"><i class="fas fa-user-plus"></i></div>')
        $(".js-registro").on('click', acceso_AlternarRegistro)
    } else {
        $(".c-acceso").toggleClass("c-acceso--desaparecer")
    }
    $(".js-acceso").children("i").toggleClass("fa-angle-up").toggleClass("fa-user")
}
function acceso_AlternarRegistro() {
    if ($(".c-carrito").length == 1) {
        if (!$(".c-carrito").hasClass("c-carrito--desaparecer")) {
            carrito_Alternar()
        }
    }
}
function acceso_AlternarLogin() {
    if ($(".c-carrito").length == 1) {
        if (!$(".c-carrito").hasClass("c-carrito--desaparecer")) {
            carrito_Alternar()
        }
    }
}
