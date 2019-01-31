function perfil_Alternar() {
    if ($(".c-carrito").length == 1) {
        if (!$(".c-carrito").hasClass("c-carrito--desaparecer")) {
            carrito_Alternar()
        }
    }
    if ($(".c-perfil").length == 0) {
        $(".p-principal").prepend(`<div class='c-perfil'>
        <div class="c-perfil__contenedor-imagen">
        <img class='c-perfil__imagen' src='`+ GLOBAL_USUARIO.foto + `'>
        </div>
        <div class="c-boton c-boton--exito c-perfil__boton js-perfil__vista" onclick='cargarVista("perfil")'>Mi perfil</div>
        <div class="c-boton c-boton--basico c-perfil__boton js-perfil__mensajes">Mis mensajes</div>
        <div class="c-boton c-boton--basico c-perfil__boton js-perfil__pedidos">Mis pedidos</div>
        <div class="c-boton c-boton--peligro c-perfil__boton js-perfil__desloguear">Cerrar sesión</div>
        </div>`)
        $(".js-perfil__desloguear").on("click", acceso_CerrarSesion)
    } else {
        $(".c-perfil").toggleClass("c-perfil--desaparecer")
    }
    if ($(".js-perfil").data("modo") == "Entrar") {
        $(".js-perfil").html("<i class='fas fa-angle-up'></i>")
        $(".js-perfil").data("modo", "Registrar")
    } else {
        $(".js-perfil").remove()
        $(".c-cabecera__botones").prepend(`<div data-modo="Entrar" class="c-cabecera__boton js-perfil">
        <div class="c-cabecera__contenedor-imagen">
        <img class='c-cabecera__imagen' src='`+ GLOBAL_USUARIO.foto + `'>
        </div></div>`)
        $(".js-perfil").on("click", perfil_Alternar)
    }
}