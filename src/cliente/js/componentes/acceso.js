function acceso_Alternar() {
    if ($(".c-carrito").length == 1) {
        if (!$(".c-carrito").hasClass("c-carrito--desaparecer")) {
            carrito_Alternar()
        }
    }
    if ($(".c-acceso").length < 1) {
        $(".p-principal").prepend(`<div data-modo="1" class='c-acceso'>
            <p class="c-acceso__titulo">Acceso</p>
            <input class="c-acceso__campo js-acceso__nombre" type="text" placeholder="Usuario">
            <input class="c-acceso__campo js-acceso__contra" type="text" placeholder="Contraseña">
            <div class="c-acceso__botones">
            <div class="c-boton c-boton--exito c-acceso__boton js-acceso__entrar">Entrar</div>
            <div class="c-boton c-boton--basico c-acceso__boton js-acceso__registro">Registrarme</div>
            </div></div>`)
        $(".js-acceso__entrar").on('click', acceso_Entrar);
        $(".js-acceso__registro").on('click', acceso_Registro);
    } else {
        $(".c-acceso").toggleClass("c-acceso--desaparecer")
    }

    if ($(".js-acceso").children("i").hasClass("fa-user") && $(".c-acceso").data("modo") == 2) {
        $(".js-acceso__entrar").removeClass("c-boton--basico").addClass("c-boton--exito")
        $(".js-acceso__registro").addClass("c-boton--basico").removeClass("c-boton--exito")
        $(".c-acceso__titulo").html("Acceso")
        $(".js-acceso-login__contra-repe").remove()
        $(".c-acceso").data("modo", "1")
    }
    $(".js-acceso").children("i").toggleClass("fa-angle-up").toggleClass("fa-user")
    $(".c-acceso__errores").remove()
}
function acceso_Entrar() {
    $(".c-acceso__errores").remove()
    if ($(".c-acceso").data("modo") == 1) {
        var comprobacion = GLOBAL_USUARIO.validarAcceso($(".js-acceso__nombre").val(), $(".js-acceso__contra").val())
        if (comprobacion.length > 0) {
            $(".c-acceso__errores").remove()
            $("<div class='c-acceso__errores c-acceso__errores--acceso'></div>").insertBefore(".c-acceso")
            comprobacion.forEach(error => {
                $(".c-acceso__errores").append("<p class='c-acceso__error-mensaje'>" + GLOBAL_USUARIO.erroresAcceso[error] + "</p>")
            })
        } else {
            // Todo Login conseguido
        }
    } else {
        $(".js-acceso__entrar").toggleClass("c-boton--basico").toggleClass("c-boton--exito")
        $(".js-acceso__registro").toggleClass("c-boton--basico").toggleClass("c-boton--exito")
        $(".c-acceso__titulo").html("Acceso")
        $(".js-acceso__contra-repe").remove()
        $(".c-acceso").data("modo", "1")
    }
}
function acceso_Registro() {
    $(".c-acceso__errores").remove()
    if ($(".c-acceso").data("modo") == 2) {
        var comprobacion = GLOBAL_USUARIO.validarRegistro($(".js-acceso__nombre").val(), $(".js-acceso__contra").val(), $(".js-acceso__contra-repe").val())
        if (comprobacion.length > 0) {
            $(".c-acceso__errores").remove()
            $("<div class='c-acceso__errores c-acceso__errores--registro'></div>").insertBefore(".c-acceso")
            comprobacion.forEach(error => {
                $(".c-acceso__errores").append("<p class='c-acceso__error-mensaje'>" + GLOBAL_USUARIO.erroresRegistro[error] + "</p>")
            })
        } else {
            // Todo registro conseguido
        }
    } else {
        $(".js-acceso__entrar").toggleClass("c-boton--basico").toggleClass("c-boton--exito")
        $(".js-acceso__registro").toggleClass("c-boton--basico").toggleClass("c-boton--exito")
        $(".c-acceso__titulo").html("Registro")
        $('<input class="c-acceso__campo js-acceso__contra-repe" type="text" placeholder="Contraseña">').insertAfter(".js-acceso__contra")
        $(".c-acceso").data("modo", "2")
    }
}