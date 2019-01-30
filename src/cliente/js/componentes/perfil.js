function perfil_Alternar() {
    if ($(".c-carrito").length == 1) {
        if (!$(".c-carrito").hasClass("c-carrito--desaparecer")) {
            carrito_Alternar()
        }
    }
    if ($(".c-perfil").length == 0) {
        $(".p-principal").prepend(`<div class='c-perfil'>
        <div class="c-perfil__contenedor-imagen">
        <img class='c-perfil__imagen' src='`+ GLOBAL_USUARIO.imagen + `'>
        </div>
        <div class="c-boton c-boton--exito c-perfil__boton js-perfil__vista">Mi perfil</div>
        <div class="c-boton c-boton--basico c-perfil__boton js-perfil__mensajes">Mis mensajes</div>
        <div class="c-boton c-boton--basico c-perfil__boton js-perfil__pedidos">Mis pedidos</div>
        <div class="c-boton c-boton--peligro c-perfil__boton js-perfil__desloguear">Cerrar sesión</div>
        </div>`)
    } else {
        $(".c-perfil").toggleClass("c-perfil--desaparecer")
    }
    if ($(".js-perfil").data("modo") == 1) {
        $(".js-perfil").html("<i class='fas fa-angle-up'></i>")
        $(".js-perfil").data("modo", "2")
    } else {
        $(".js-perfil").remove()
        $(".c-cabecera__botones").prepend(`<div data-modo="1" class="c-cabecera__boton js-perfil">
        <div class="c-perfil__contenedor-imagen c-perfil__contenedor-imagen--cabecera">
        <img class='c-perfil__imagen c-perfil__imagen--cabecera' src='`+ GLOBAL_USUARIO.imagen + `'>
        </div></div>`)
        $(".js-perfil").on("click", perfil_Alternar)
    }
}