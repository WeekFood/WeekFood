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
            <input class="c-acceso__campo js-acceso__contra" type="password" placeholder="Contraseña">
            <div class="c-acceso__botones">
            <div class="c-boton c-boton--exito c-acceso__boton js-acceso__entrar">Entrar</div>
            <div class="c-boton c-boton--basico c-acceso__boton js-acceso__registro">Registrarme</div>
            </div></div>`)
        $(".js-acceso__entrar").on('click', acceso_Entrar);
        $(".js-acceso__registro").on('click', acceso_Registro);
        $(".js-acceso__nombre").on('keyup', acceso_Escribiendo);
        $(".js-acceso__contra").on('keyup', acceso_Escribiendo);
    } else {
        $(".c-acceso").toggleClass("c-acceso--desaparecer")
    }

    if ($(".js-acceso").children("i").hasClass("fa-user") && $(".c-acceso").data("modo") == 2) {
        $(".js-acceso__entrar").removeClass("c-boton--basico").addClass("c-boton--exito")
        $(".js-acceso__registro").addClass("c-boton--basico").removeClass("c-boton--exito")
        $(".c-acceso__titulo").html("Acceso")
        $(".js-acceso__contra-repe").remove()
        $(".c-acceso").data("modo", "1")
    }
    $(".js-acceso").children("i").toggleClass("fa-angle-up").toggleClass("fa-user")
    acceso_ReiniciarCampos()
}
function acceso_Entrar() {
    if ($(".c-acceso").data("modo") == 1) {
        GLOBAL_USUARIO.acceder($(".js-acceso__nombre").val(), $(".js-acceso__contra").val())
            .done(() => { forzarLogueo() })
            .fail(() => {
                    $("<div class='c-acceso__errores c-acceso__errores--acceso'></div>").insertBefore(".c-acceso")
                    $(".c-acceso__errores").append("<p class='c-acceso__error-mensaje'>" + GLOBAL_USUARIO.erroresAcceso[0] + "</p>")
            })
    } else {
        acceso_ReiniciarCampos()
        $(".js-acceso__entrar").toggleClass("c-boton--basico").toggleClass("c-boton--exito")
        $(".js-acceso__registro").toggleClass("c-boton--basico").toggleClass("c-boton--exito")
        $(".c-acceso__titulo").html("Acceso")
        $(".js-acceso__contra-repe").remove()
        $(".c-acceso").data("modo", "1")
    }
}
function acceso_Registro() {
    if ($(".c-acceso").data("modo") == 2) {
        if (!acceso_ErroresRegistro()) {
            GLOBAL_USUARIO.acceso_RegistroUsuarioLibre(($(".js-acceso__nombre").val()))
                .done(() => { forzarLogueo() })
                .fail(()=>{
                        $("<div class='c-acceso__errores c-acceso__errores--registro'></div>").insertBefore(".c-acceso")
                        $(".c-acceso__errores").append("<p class='c-acceso__error-mensaje'>" + GLOBAL_USUARIO.erroresRegistro[0] + "</p>")
                    })
        }
    } else {
        acceso_ReiniciarCampos()
        $(".js-acceso__entrar").toggleClass("c-boton--basico").toggleClass("c-boton--exito")
        $(".js-acceso__registro").toggleClass("c-boton--basico").toggleClass("c-boton--exito")
        $(".c-acceso__titulo").html("Registro")
        $('<input class="c-acceso__campo js-acceso__contra-repe" type="password" placeholder="Contraseña">').insertAfter(".js-acceso__contra")
        $(".c-acceso").data("modo", "2")
        $(".js-acceso__contra-repe").on('keyup', acceso_Escribiendo);
    }
}
function acceso_Escribiendo(evento) {
    if ($(".c-acceso").data("modo") == 1) {
        if (evento.keyCode === 13) {
            acceso_Entrar()
        }
    } else {
        if (!acceso_ErroresRegistro() && evento.keyCode === 13) {
            acceso_Registro()
        }
    }
}
function acceso_ErroresRegistro() {
    var comprobacion = GLOBAL_USUARIO.validarRegistro($(".js-acceso__nombre").val(), $(".js-acceso__contra").val(), $(".js-acceso__contra-repe").val())
    $(".c-acceso__errores").html("")
    if (comprobacion.length > 0) {
        if ($(".c-acceso__errores").length == 0) {
            $("<div class='c-acceso__errores c-acceso__errores--registro'></div>").insertBefore(".c-acceso")
        }
        comprobacion.forEach(error => {
            $(".c-acceso__errores").append("<p class='c-acceso__error-mensaje'>" + GLOBAL_USUARIO.erroresRegistro[error] + "</p>")
        })
    } else {
        $(".c-acceso__errores").remove()
    }
    return comprobacion.length > 0
}
function acceso_ReiniciarCampos() {
    $(".js-acceso__nombre").val("")
    $(".js-acceso__contra").val("")
    $(".js-acceso__contra-repe").val("")
    $(".c-acceso__errores").remove()
}