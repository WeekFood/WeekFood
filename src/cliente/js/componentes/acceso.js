function acceso_Alternar() {
    if ($(".c-carrito").length == 1) {
        if (!$(".c-carrito").hasClass("c-carrito--desaparecer")) {
            carrito_Alternar()
        }
    }
    if ($(".c-acceso").length < 1) {
        $(".p-principal").prepend(`<div data-modo="1" class='c-acceso'>
            <p class="c-acceso__titulo">Acceso</p>
            <form>
            <input class="c-acceso__campo js-acceso__nombre" type="text" placeholder="Usuario">
            <input class="c-acceso__campo js-acceso__contra" type="password" placeholder="Contraseña">
            </form>
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
        if (!acceso_ErroresAcceso()) {
            GLOBAL_USUARIO.acceder($(".js-acceso__nombre").val(), $(".js-acceso__contra").val())
                .done(() => { iniciarAplicacion() })
                .fail((respuesta) => {
                    switch (respuesta.responseJSON.error) {
                        case "USUARIO_NO_ENCONTRADO":
                            acceso_MensajeError(GLOBAL_USUARIO.erroresAcceso[0])
                            break
                        case "CONTRASEÑA_INCORRECTA":
                            acceso_MensajeError(GLOBAL_USUARIO.erroresAcceso[1])
                            break
                        default:
                            acceso_MensajeError(GLOBAL_USUARIO.errorGenerico)
                    }
                })
        }
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
                .done((respuesta) => {
                    if (respuesta.yaExiste) {
                        acceso_MensajeError(GLOBAL_USUARIO.erroresRegistro[0], 0)
                    } else {
                        GLOBAL_USUARIO.registrar($(".js-acceso__nombre").val(), $(".js-acceso__contra").val())
                            .fail((respuesta) => {
                                acceso_MensajeError(GLOBAL_USUARIO.erroresRegistro[0], 0)
                            })
                            .done(() => {
                                crearCookie("Redirect", "/perfil")
                                GLOBAL_USUARIO.id = 1; /*TODO SACAR DE DONDE PROCEDA */
                                iniciarAplicacion();
                                setTimeout(() => {
                                    generarVentanaModal({
                                        tipo: "info",
                                        contenido: `
                                        <div class="c-acceso__bienvenida">
                                        <div class="c-acceso__bienvenida-titulo">¡Hola `+ GLOBAL_USUARIO.nick + `!</div>
                                        <div class="c-acceso__bienvenida-contenido">Desde el equipo de WeekFood, queremos darte una calurosa bienvenida.</div>
                                        <div class="c-acceso__bienvenida-contenido">Esperamos que quedes satisfecho, como el 98% de los usuarios.</div>
                                        <div class="c-acceso__bienvenida-contenido--nota">Fuente: Encuesta de satisfacción</div>
                                        </div>`,
                                        info_boton_basico: true,
                                        callback_Confirmar: () => { }
                                    })
                                }
                                    , 500
                                )
                            })
                    }
                })
                .fail((respuesta) => {
                    acceso_MensajeError(GLOBAL_USUARIO.errorGenerico, 0)
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
function acceso_ErroresAcceso() {
    var comprobacion = GLOBAL_USUARIO.validarAcceso($(".js-acceso__nombre").val(), $(".js-acceso__contra").val())
    $(".c-acceso__errores").html("")
    if (comprobacion.length > 0) {
        if ($(".c-acceso__errores").length == 0) {
            $("<div class='c-acceso__errores c-acceso__errores--acceso'></div>").insertBefore(".c-acceso")
        }
        comprobacion.forEach(error => {
            $(".c-acceso__errores").append("<p class='c-acceso__error-mensaje'>" + GLOBAL_USUARIO.erroresAcceso[error] + "</p>")
        })
    } else {
        $(".c-acceso__errores").remove()
    }
    return comprobacion.length > 0
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
    $(".js-acceso__contra").val("")
    $(".js-acceso__contra-repe").val("")
    $(".c-acceso__errores").remove()
}
function acceso_MensajeError(mensaje, tipo = 1) {
    if (tipo == 0) {
        if ($(".c-acceso__errores").length == 0) {
            $("<div class='c-acceso__errores c-acceso__errores--registro'></div>").insertBefore(".c-acceso")
        }
        $(".c-acceso__errores").html("<p class='c-acceso__error-mensaje'>" + mensaje + "</p>")
    } else {
        if ($(".c-acceso__errores").length == 0) {
            $("<div class='c-acceso__errores c-acceso__errores--acceso'></div>").insertBefore(".c-acceso")
        }
        $(".c-acceso__errores").html("<p class='c-acceso__error-mensaje'>" + mensaje + "</p>")

    }
}
function acceso_LoginInicial() {
    if (extraerCookie("token") != null) {
        GLOBAL_CACHE_JSONS.getJSON("/api/usuarios/" + GLOBAL_USUARIO.id).then((respuesta) => {
            GLOBAL_USUARIO.nick = respuesta[0].nick
            GLOBAL_USUARIO.nombre = respuesta[0].nombre
            GLOBAL_USUARIO.foto = respuesta[0].foto
            $(".js-acceso").remove()
            $(".c-cabecera__botones").prepend(`<div data-modo="1" class="c-cabecera__boton js-perfil">
            <div class="c-perfil__contenedor-imagen c-perfil__contenedor-imagen--cabecera">
            <img class='c-perfil__imagen c-perfil__imagen--cabecera' src='`+ GLOBAL_FOTOS_USUARIOS + GLOBAL_USUARIO.foto + `'>
            </div></div>`)
            $(".js-perfil").on("click", perfil_Alternar)
            $(".c-acceso, .c-acceso__errores").remove()
            generarNotificacion("Hola de nuevo, " + GLOBAL_USUARIO.nick, 1)
            carrito_Descargar()
        })
    } else {
        if ($(".js-perfil").length > 0) {
            $(".js-perfil").remove()
            $(".c-cabecera__botones").prepend(`
                <div class="c-cabecera__boton js-acceso">
                    <i class="fas fa-user"></i>
                </div>`)
            $(".js-acceso").on('click', acceso_Alternar)
        }
        if ($(".c-perfil").length > 0) {
            $(".c-perfil").remove()
        }
    }
}
function acceso_CerrarSesion() {
    generarVentanaModal({
        tipo: "confirmacion",
        tamaño: "pequeño",
        contenido: '<div class="c-acceso__logout">¡Hasta pronto!</div>',
        callback_Confirmar: () => { },
        boton_Confirmar: "Seguir en WeekFood",
        callback_Denegar: () => {
            // Todo cerrar sesion en API
            borrarCookie("token")
            GLOBAL_USUARIO = new Usuario
            iniciarAplicacion()
        },
        boton_Denegar: "Cerrar sesión"
    })
}