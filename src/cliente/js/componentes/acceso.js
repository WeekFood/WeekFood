function acceso_Alternar() {
    if ($(".c-carrito").length == 1) {
        if (!$(".c-carrito").hasClass("c-carrito--desaparecer")) {
            carrito_Alternar()
        }
    }
    if ($(".c-acceso").length < 1) {
        $(".p-principal").prepend(`<div data-modo="Entrar" class='c-acceso'>
            <p class="c-acceso__titulo">Acceso</p>
            <form>
            <input class="c-acceso__campo js-acceso__nombre" type="text" placeholder="Usuario">
            <input class="c-acceso__campo js-acceso__contra" type="password" placeholder="Contraseña">
            </form>
            <div class="c-acceso__botones">
            <div class="c-boton c-boton--exito c-acceso__boton js-acceso__boton-superior">Entrar</div>
            <div class="c-acceso__cambio-modo js-acceso__boton-inferior">Registrarme</div>
            </div></div>`)
        $(".js-acceso__boton-superior").on('click', acceso_Entrar);
        $(".js-acceso__boton-inferior").on('click', acceso_Registro);
        $(".js-acceso__nombre").on('keyup', acceso_Escribiendo);
        $(".js-acceso__contra").on('keyup', acceso_Escribiendo);
    } else {
        $(".c-acceso").toggleClass("c-acceso--desaparecer")
    }

    if ($(".js-acceso").children("i").hasClass("fa-user") && $(".c-acceso").data("modo") == "Registro") {
        $(".js-acceso__entrar").removeClass("c-boton--basico").addClass("c-boton--exito")
        $(".js-acceso__registro").addClass("c-boton--basico").removeClass("c-boton--exito")
        $(".c-acceso__titulo").html("Acceso")
        $(".js-acceso__contra-repe").remove()
        $(".c-acceso").data("modo", "Entrar")
    }
    $(".js-acceso").children("i").toggleClass("fa-angle-up").toggleClass("fa-user")
    acceso_ReiniciarCampos()
}
function acceso_Entrar() {
    if ($(".c-acceso").data("modo") == "Entrar") {
        if (!acceso_ErroresAcceso()) {
            GLOBAL_USUARIO.acceder($(".js-acceso__nombre").val(), $(".js-acceso__contra").val())
                .done(() => { iniciarAplicacion() })
                .fail((respuesta) => {
                    switch (respuesta.responseJSON.error) {
                        case "USUARIO_NO_ENCONTRADO":
                            acceso_MensajeError(GLOBAL_USUARIO.erroresAcceso.Usu_No_Existe)
                            break
                        case "CONTRASEÑA_INCORRECTA":
                            acceso_MensajeError(GLOBAL_USUARIO.erroresAcceso.Cont_No_Valido)
                            break
                        default:
                            acceso_MensajeError(GLOBAL_USUARIO.errorGenerico)
                    }
                })
        }
    } else {
        activar_modoEntrar()
    }
}
function activar_modoEntrar() {
    acceso_ReiniciarCampos()
    $(".c-acceso__titulo").html("Acceso")
    $(".js-acceso__contra-repe").remove()
    $(".c-acceso").data("modo", "Entrar")
    $(".js-acceso__boton-superior").html("Entrar")
    $(".js-acceso__boton-inferior").html("Registrarme")

    $(".js-acceso__boton-superior").off("click").on('click', acceso_Entrar);
    $(".js-acceso__boton-inferior").off("click").on('click', acceso_Registro);
}
function acceso_Registro() {
    if ($(".c-acceso").data("modo") == "Registro") {
        if (!acceso_ErroresRegistro()) {
            GLOBAL_USUARIO.acceso_RegistroUsuarioLibre(($(".js-acceso__nombre").val()))
                .done((respuesta) => {
                    if (respuesta.yaExiste) {
                        acceso_MensajeError(GLOBAL_USUARIO.erroresRegistro.Usu_Ya_Existe)
                    } else {
                        GLOBAL_USUARIO.registrar($(".js-acceso__nombre").val(), $(".js-acceso__contra").val())
                            .fail(() => {
                                acceso_MensajeError(GLOBAL_USUARIO.erroresRegistro.Usu_Ya_Existe)
                            })
                            .done(() => {
                                crearCookie("Redirect", "/perfil")
                                iniciarAplicacion(false, true);
                            })
                    }
                })
                .fail(() => {
                    acceso_MensajeError(GLOBAL_USUARIO.errorGenerico)
                })
        }
    } else {
        activar_modoRegistro()
    }
}
function activar_modoRegistro() {
    acceso_ReiniciarCampos()
    $(".c-acceso__titulo").html("Registro")
    $('<input class="c-acceso__campo js-acceso__contra-repe" type="password" placeholder="Contraseña">').insertAfter(".js-acceso__contra")
    $(".c-acceso").data("modo", "Registro")
    $(".js-acceso__contra-repe").off("click").on('keyup', acceso_Escribiendo);
    $(".js-acceso__boton-superior").html("Registrarme")
    $(".js-acceso__boton-inferior").html("Entrar")

    $(".js-acceso__boton-superior").off("click").on('click', acceso_Registro);
    $(".js-acceso__boton-inferior").off("click").on('click', acceso_Entrar);
}
function acceso_Escribiendo(evento) {
    if ($(".c-acceso").data("modo") == "Entrar") {
        if (evento.key == 'Enter') {
            acceso_Entrar()
        }
    } else {
        if (!acceso_ErroresRegistro() && evento.key == 'Enter') {
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
function acceso_MensajeError(mensaje) {
    if ($(".c-acceso").data("modo") == "Entrar") {
        if ($(".c-acceso__errores").length == 0) {
            $("<div class='c-acceso__errores c-acceso__errores--acceso'></div>").insertBefore(".c-acceso")
        }
        $(".c-acceso__errores").html("<p class='c-acceso__error-mensaje'>" + mensaje + "</p>")
    } else {
        if ($(".c-acceso__errores").length == 0) {
            $("<div class='c-acceso__errores c-acceso__errores--registro'></div>").insertBefore(".c-acceso")
        }
        $(".c-acceso__errores").html("<p class='c-acceso__error-mensaje'>" + mensaje + "</p>")

    }
}
function acceso_LoginInicial(primeraVez = false) {
    if (extraerCookie("token") != null) {
        GLOBAL_USUARIO.renovarToken()
            .done(() => {
                GLOBAL_USUARIO.id = getIDcookie()
                GLOBAL_CACHE_JSONS.getJSON("/api/usuarios/" + GLOBAL_USUARIO.id)
                    .then((respuesta) => {
                        GLOBAL_USUARIO.nick = respuesta[0].nick
                        GLOBAL_USUARIO.nombre = respuesta[0].nombre
                        GLOBAL_USUARIO.sexo = respuesta[0].sexo
                        if (respuesta[0].foto == null) {
                            GLOBAL_USUARIO.foto = "imagenes/placeholders/perfil_defecto_"
                            switch (GLOBAL_USUARIO.sexo) {
                                case "H":
                                    GLOBAL_USUARIO.foto += "hombre.png"
                                    break
                                case "M":
                                    GLOBAL_USUARIO.foto += "mujer.png"
                                    break
                                default:
                                    GLOBAL_USUARIO.foto += "indefinido.png"
                            }
                        } else {
                            GLOBAL_USUARIO.foto = "/imagenes/usuarios/" + respuesta[0].foto
                        }
                        $(".js-acceso").remove()
                        $(".c-cabecera__botones").prepend(`<div data-modo="Entrar" class="c-cabecera__boton js-perfil">
                        <div class="c-cabecera__contenedor-imagen">
                        <img class='c-cabecera__imagen' src='`+ GLOBAL_USUARIO.foto + `'>
                        </div></div>`)
                        $(".js-perfil").on("click", perfil_Alternar)
                        $(".c-acceso, .c-acceso__errores").remove()
                        if (primeraVez) {
                            generarVentanaModal({
                                tipo: "info",
                                contenido: `
                                <div class="c-bienvenida">
                                <div class="c-bienvenida__titulo">¡Hola `+ GLOBAL_USUARIO.nick + `!</div>
                                <div class="c-bienvenida__contenido">Desde el equipo de WeekFood, queremos darte una calurosa bienvenida.</div>
                                <div class="c-bienvenida__contenido">Esperamos que quedes satisfecho, como el 98% de los usuarios.</div>
                                <div class="c-bienvenida__nota">Fuente: Encuesta de satisfacción</div>
                                </div>`,
                                info_boton_basico: true,
                                callback_Confirmar: () => { }
                            })
                        } else {
                            generarNotificacion("Hola de nuevo, " + GLOBAL_USUARIO.nick, 1)
                        }
                        carrito_Descargar()
                    })
            })
            .fail(() => {
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
                acceso_Alternar()
                generarNotificacion("Tu sesión ha expirado")
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
            GLOBAL_USUARIO.cerrarSesion()
                .done(() => {
                    GLOBAL_USUARIO = new Usuario
                    borrarCookie("token")
                    iniciarAplicacion()
                })
                .fail(() => {
                    generarNotificacion("No se ha podido cerrar tu sesión")
                })
        },
        boton_Denegar: "Cerrar sesión"
    })
}