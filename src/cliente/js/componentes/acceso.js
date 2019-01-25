function acceso_Alternar() {
    if ($(".js-registro").length < 1) {
        console.log("Añadiendo boton registro")
        $(".c-cabecera__botones").prepend('<div class="c-cabecera__boton js-registro"><i class="fas fa-user-plus"></i></div>')
        $(".js-registro").on('click', acceso_AlternarRegistro)
    }
    if (!acceso_AlternarLogin()) {
        console.log("Si se ha subido login, borrar registro")
        $(".js-acceso__panel").remove()
        $(".js-registro").remove()
    }
}
function acceso_AlternarRegistro() {
    if ($(".c-carrito").length == 1) {
        if (!$(".c-carrito").hasClass("c-carrito--desaparecer")) {
            carrito_Alternar()
        }
    }
    $(".js-acceso__panel").remove()
    $(".js-acceso").children("i").toggleClass("fa-angle-up").toggleClass("fa-user")
    $(".p-principal").prepend(`<div class='c-acceso__panel js-acceso__panel'>
        <p class="c-acceso__titulo">Nuevo usuario</p>
        <input class="c-acceso__campo" id="acceso-login__nombre" type="text" placeholder="Usuario">
        <br><input class="c-acceso__campo" id="acceso-login__contra" type="text" placeholder="Contraseña">
        <br><input class="c-acceso__campo" id="acceso-login__contra-repe" type="text" placeholder="Contraseña">
        <br><div class="c-boton c-boton--basico c-acceso__boton">Registro</div>
        </div>`)
    $(".js-registro").children("i").toggleClass("fa-angle-up").toggleClass("fa-user-plus")
    return true
}
function acceso_AlternarLogin() {
    if ($(".c-carrito").length == 1) {
        if (!$(".c-carrito").hasClass("c-carrito--desaparecer")) {
            carrito_Alternar()
        }
    }
    if($(".js-registro").children("i").hasClass("fa-angle-up")){
        $(".js-registro").children("i").toggleClass("fa-angle-up").toggleClass("fa-user-plus")
    }
    $(".js-acceso__panel").remove()
    $(".p-principal").prepend(`<div class='c-acceso__panel js-acceso__panel'>
        <p class="c-acceso__titulo">Acceso</p>
        <input class="c-acceso__campo" id="acceso-login__nombre" type="text" placeholder="Usuario">
        <br><input class="c-acceso__campo" id="acceso-login__contra" type="text" placeholder="Contraseña">
        <br><div class="c-boton c-boton--basico c-acceso__boton">Entrar</div>
        </div>`)
    $(".js-acceso").children("i").toggleClass("fa-angle-up").toggleClass("fa-user")
    return $(".js-acceso").children("i").hasClass("fa-angle-up")
}
