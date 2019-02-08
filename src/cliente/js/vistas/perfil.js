function vista_Perfil(puntoMontaje) {
    montarMenu("/api/menu", "perfil")
    vista_Perfil_generarHTML(puntoMontaje)
}
function vista_Perfil_generarHTML(puntoMontaje) {
    var usuario = {
        /*
        ubicaciones =[
            "Avda. Los llanos, 73 26270 Ojacastro",
            "Avda. Los llanos, 23 26270 Ojacastro",
            "Avda. Los llanos, 523 26270 Ojacastro",
        ],
        metodosPago: [
            { titulo: "MasterCard", valor: "**** **** **** 4742, 9/2024" },
            { titulo: "Visa", valor: "**** **** **** 4772, 8/2030" },
            { titulo: "Paypal", valor: "**** **** **** 4572, 1/2028" },
            { titulo: "Visa", valor: "**** **** **** 9782, 9/2022" },
            { titulo: "MasterCard", valor: "**** **** **** 1457, 10/2024" }
        ],
        pedidos: [
            {
                id: 1,
                fechaCompra: "7/7/17",
                horaCompra: "16:15",
                fechaEntregado: "12/7/17",
                horaEntregado: "14:16",
                articulos: [
                    { id: 1, cantidad: 1 },
                    { id: 2, cantidad: 3 }
                ]
            },
            {
                id: 2,
                fechaCompra: "9/8/17",
                horaCompra: "17:55",
                fechaEntregado: "19/9/17",
                horaEntregado: "15:10",
                articulos: [
                    { id: 3, cantidad: 1 },
                    { id: 4, cantidad: 2 }
                ]
            },
            {
                id: 3,
                fechaCompra: "7/7/17",
                horaCompra: "16:15",
                fechaEntregado: "12/7/17",
                horaEntregado: "14:16",
                articulos: [
                    { id: 1, cantidad: 1 },
                    { id: 2, cantidad: 3 }
                ]
            },
            {
                id: 4,
                fechaCompra: "9/8/17",
                horaCompra: "17:55",
                fechaEntregado: "19/9/17",
                horaEntregado: "15:10",
                articulos: [
                    { id: 3, cantidad: 1 },
                    { id: 4, cantidad: 2 }
                ]
            },
            {
                id: 5,
                fechaCompra: "7/7/17",
                horaCompra: "16:15",
                fechaEntregado: "12/7/17",
                horaEntregado: "14:16",
                articulos: [
                    { id: 1, cantidad: 1 },
                    { id: 2, cantidad: 3 },
                    { id: 3, cantidad: 1 },
                    { id: 3, cantidad: 1 },
                    { id: 3, cantidad: 1 },
                    { id: 3, cantidad: 1 }
                ]
            },
            {
                id: 6,
                fechaCompra: "9/8/17",
                horaCompra: "17:55",
                fechaEntregado: "19/9/17",
                horaEntregado: "15:10",
                articulos: [
                    { id: 3, cantidad: 1 },
                    { id: 3, cantidad: 1 },
                    { id: 4, cantidad: 2 }
                ]
            }
        ]
        */
    }
    GLOBAL_USUARIO.nuevosDatos = Object.assign({}, GLOBAL_USUARIO.datos)
    var metodosPago = `<div class='c-vista-perfil__metodos-pago-inicio'>
    <p class='c-vista-perfil__titulo'>Métodos de pago</p></div>`
    if (GLOBAL_USUARIO.metodosPago.length == 0) {
        metodosPago += `<div class='c-vista-perfil__metodos-pago-final'>
                            <p>No tienes métodos de pago</p></div>
                        <div class='c-vista-perfil__metodos-pago-final'>
                            <p class='c-boton c-boton--basico c-vista-perfil__boton'> Añadir Nuevo </p></div>`
    } else {

        for (var x = 1; x < GLOBAL_USUARIO.metodosPago.length - 1 && x < 4; x++) {
            var metodoPago = GLOBAL_USUARIO.metodosPago[GLOBAL_USUARIO.metodosPago.length - x]
            metodosPago += `<div class='c-vista-perfil__metodo-pago'>
            <span>` + metodoPago.titulo + `</span>
            <span'>` + metodoPago.valor + `</span>
            </div>`
        }
        if (GLOBAL_USUARIO.metodosPago.length > 3) {
            metodosPago += `<div class='c-vista-perfil__metodos-pago-final'>
                        <p class='c-boton c-boton--basico c-vista-perfil__boton'>` + (GLOBAL_USUARIO.metodosPago.length - 3) + " mas...</p></div>"
        }
    }
    var pedidos = `<div class='c-vista-perfil__pedidos-inicio'>
    <p class='c-vista-perfil__titulo'>Pedidos</p></div>`
    if (GLOBAL_USUARIO.pedidos.length == 0) {
        pedidos += "<div class='c-vista-perfil__pedidos-final'><p>No tienes pedidos</p></div>"
    } else {
        for (var x = 1; x < GLOBAL_USUARIO.pedidos.length - 1 && x < 4; x++) {
            var pedido = GLOBAL_USUARIO.pedidos[GLOBAL_USUARIO.pedidos.length - x]
            pedidos += `
            <div class='c-pedido'>
            <span class="c-pedido__id">` + pedido.id + `</span>
            <span class="c-pedido__compra">Compra</span>
            <span class="c-pedido__compra-fecha">` + pedido.fechaCompra + `</span>
            <span class="c-pedido__compra-hora">`+ pedido.horaCompra + `</span>
            <span class="c-pedido__entrega">Entrega</span>
            <span class="c-pedido__entrega-fecha"> ` + pedido.fechaEntregado + `</span>
            <span class="c-pedido__entrega-hora">`+ pedido.horaEntregado + `</span>
            <span class="c-pedido__articulos">` + pedido.articulos.length + ` artículos</span>
            </div>`
        }
        if (GLOBAL_USUARIO.pedidos.length > 3) {
            pedidos += `<div class='c-vista-perfil__pedidos-final'>
                        <p class='c-boton c-boton--basico c-vista-perfil__boton'>` + (GLOBAL_USUARIO.pedidos.length - 3) + " mas...</p></div>"
        }
    }
    var html =
        `<div class="c-vista-perfil">
            <div class="c-vista-perfil__edicion c-boton c-boton--basico js-edicion-general">
                <i class='fas fa-edit js-edicion-general-icono'></i> 
                <span class="js-edicion-texto">Editar</span>
            </div>
            <div class="c-vista-perfil__usuario">
                <div class='c-vista-perfil__foto-relativo'>
                    <div class='c-vista-perfil__foto-contenedor'>
                        <img class='c-vista-perfil__foto' src='`+ GLOBAL_USUARIO.nuevosDatos.foto + `'>
                    </div>
                </div>`
        + (GLOBAL_USUARIO.nuevosDatos.nombre != undefined ? (`<p class='c-vista-perfil__nombre'>` + GLOBAL_USUARIO.nuevosDatos.nombre + `</p>`) : "")
        + (GLOBAL_USUARIO.nuevosDatos.apellidos != undefined ? (`<p class='c-vista-perfil__apellidos'>` + GLOBAL_USUARIO.nuevosDatos.apellidos + `</p>`) : "")
        + `     <div class='c-vista-perfil__datos' >
                    <p class='c-vista-perfil__dato'>
                        <span class='c-vista-perfil__dato-titulo'>Nick</span>
                        <span>`+ GLOBAL_USUARIO.nick + `</span>
                    </p>`
        + (GLOBAL_USUARIO.nuevosDatos.fechaNacimiento != undefined ? (`<p class='c-vista-perfil__dato'><span class='c-vista-perfil__dato-titulo'>` + GLOBAL_USUARIO.diccionarioDatos.fechaNacimiento + `</span><span>` + GLOBAL_USUARIO.nuevosDatos.fechaNacimiento + `</span></p>`) : "")
        + (GLOBAL_USUARIO.nuevosDatos.telefono != undefined ? (`<p class='c-vista-perfil__dato'><span class='c-vista-perfil__dato-titulo'>` + GLOBAL_USUARIO.diccionarioDatos.telefono + `</span><span>` + GLOBAL_USUARIO.nuevosDatos.telefono + `</span></p>`) : "")

    if (GLOBAL_USUARIO.nuevosDatos.sexo == "H" || GLOBAL_USUARIO.nuevosDatos.sexo == "M") {
        html += `   <p class='c-vista-perfil__dato'>
                        <span class='c-vista-perfil__dato-titulo'>`+ GLOBAL_USUARIO.diccionarioDatos.sexo + `</span>
                        <span>`
        switch (GLOBAL_USUARIO.datos.sexo) {
            case "H":
                html += "Hombre"
                break
            case "M":
                html += "Mujer"
                break
        }
        html += `       </span>
                    </p>`
    }
    html += `   </div >
            </div >
        <div class="c-vista-perfil__detalles">
            <div class='c-vista-perfil__metodos-pago'>`+ metodosPago + `</div>
            <div class='c-vista-perfil__pedidos'>`+ pedidos + `</div>
            <p class='c-boton c-boton--basico c-vista-perfil__ubicaciones c-vista-perfil__boton'>Mis ubicaciones</p>
        </div>
    </div > `

    $(puntoMontaje).html(html)
    $(".js-edicion-general").off("click")
    $(".js-edicion-general").click(puntoMontaje, vista_Perfil_activarEdicion)
}
function vista_Perfil_activarEdicion(evento) {
    /*k
    Lo de evento.data es porque al usar .click el parametro se añade al evento
    https://stackoverflow.com/questions/3273350/jquerys-click-pass-parameters-to-user-function
    */
    $(".c-vista-perfil").addClass("c-vista-perfil--edicion")
    $(".js-edicion-texto").html("Guardar")

    var html =
        `<div class="c-vista-perfil">
        <div class="c-vista-perfil__edicion c-boton c-boton--basico js-edicion-general">
            <i class='fas fa-edit js-edicion-general-icono'></i> 
            <span class="js-edicion-texto">Guardar</span>
        </div>
        <div class="c-vista-perfil__usuario">
            <div class='c-vista-perfil__foto-relativo'>
                <div class='c-vista-perfil__foto-contenedor'>
                    <img class='c-vista-perfil__foto js-foto' src='`+ GLOBAL_USUARIO.nuevosDatos.foto + `'>
                </div>
            </div>
            <p class='c-vista-perfil__nombre c-vista-perfil__nombre-editable'>
                <span class="js-nombre-boton">
                    <i class='fas fa-edit c-vista-perfil__edit-icono js-nombre-boton-contenido'></i>
                </span>
                <span class="js-nombre-contenido">`
        + (GLOBAL_USUARIO.nuevosDatos.nombre != undefined ? GLOBAL_USUARIO.nuevosDatos.nombre : GLOBAL_USUARIO.diccionarioDatos.nombre)
        + `     </span>
                <span class="js-nombre-boton-cerrar">
                </span>
            </p>
            <p class='c-vista-perfil__apellidos c-vista-perfil__apellidos-editable'>
                <span class="js-apellidos-boton">
                    <i class='fas fa-edit c-vista-perfil__edit-icono js-apellidos-boton-contenido'></i>
                </span>
                <span class="js-apellidos-contenido">`
        + (GLOBAL_USUARIO.nuevosDatos.apellidos != undefined ? GLOBAL_USUARIO.nuevosDatos.apellidos : GLOBAL_USUARIO.diccionarioDatos.apellidos)
        + `     </span>
                <span class="js-apellidos-boton-cerrar">
                </span>
            </p>
            <div class='c-vista-perfil__datos' >
                <p class='c-vista-perfil__dato'>
                    <span class='c-vista-perfil__dato-titulo'>Nick</span>
                    <span>`
        + GLOBAL_USUARIO.nick
        + `         </span>
                </p>
                <p class='c-vista-perfil__dato js-fechaNacimiento'>
                    <span class='c-vista-perfil__dato-titulo'>`+ GLOBAL_USUARIO.diccionarioDatos.fechaNacimiento + `</span>
                    <span class="c-vista-perfil__dato-contenido">
                        <span class="js-fechaNacimiento-boton">
                            <i class='fas fa-edit c-vista-perfil__edit-icono js-fechaNacimiento-boton-contenido'></i>
                        </span>
                        <span class="js-fechaNacimiento-contenido">`
        + (GLOBAL_USUARIO.nuevosDatos.fechaNacimiento != undefined ? GLOBAL_USUARIO.nuevosDatos.fechaNacimiento : "Añadir")
        + `             </span>
                        <span class="js-fechaNacimiento-boton-cerrar">
                        </span>
                    </span>
                </p>
                <p class='c-vista-perfil__dato js-telefono'>
                    <span class='c-vista-perfil__dato-titulo'>`+ GLOBAL_USUARIO.diccionarioDatos.telefono + `</span>
                    <span class="c-vista-perfil__dato-contenido">
                        <span class="js-telefono-boton">
                            <i class='fas fa-edit c-vista-perfil__edit-icono js-telefono-boton-contenido'></i>
                        </span>
                        <span class="js-telefono-contenido">`
        + (GLOBAL_USUARIO.nuevosDatos.telefono != undefined ? GLOBAL_USUARIO.nuevosDatos.telefono : "Añadir")
        + `             </span>
                        <span class="js-telefono-boton-cerrar">
                        </span>
                    </span>
                </p>
                <p class='c-vista-perfil__dato js-sexo'>
                    <span class='c-vista-perfil__dato-titulo'>`+ GLOBAL_USUARIO.diccionarioDatos.sexo + `</span>
                    <span class="c-vista-perfil__dato-contenido">
                        <span class="js-sexo-boton">
                            <i class='fas fa-edit c-vista-perfil__edit-icono js-sexo-boton-contenido'></i>
                        </span>
                        <span class="js-sexo-contenido">`
    switch (GLOBAL_USUARIO.nuevosDatos.sexo) {
        case "H":
            html += "Hombre"
            break
        case "M":
            html += "Mujer"
            break
        default:
            html += "Añadir"
    }

    html += `           </span>
                        <span class="js-sexo-boton-cerrar">
                        </span>
                    </span>
                </p>
            </div>
        </div>
        <span class="c-vista-perfil__letra-pequeña">
            Estos datos son meramente informativos, para el equipo de asistencia al cliente y con propósitos estadísticos.
            <br>Al rellenar los campos aceptas ambas cláusulas.
        </span>
    </div>`
    $(evento.data).html(html)
    $(".js-edicion-general").click(evento.data, vista_Perfil_guardarEdicion)
    $(".c-vista-perfil__foto").on(
        {
            mouseover: () => {
                $(".c-vista-perfil__foto-contenedor").prepend(`
            <div class='c-vista-perfil__foto-edit'>
            <i class='fas fa-edit fa-4x c-vista-perfil__edit-icono'></i>
            </div>`)
            },
            click: () => { vista_Perfil_activarEdicionCampo("foto") },
            mouseleave: () => {
                $(".c-vista-perfil__foto-edit").remove()
            }
        });
    $(".js-nombre-boton").click(() => {
        vista_Perfil_activarEdicionCampo("nombre")
    })
    $(".js-apellidos-boton").click(() => {
        vista_Perfil_activarEdicionCampo("apellidos")
    })
    $(".js-fechaNacimiento-boton").click(() => {
        vista_Perfil_activarEdicionCampo("fechaNacimiento")
    })
    $(".js-telefono-boton").click(() => {
        vista_Perfil_activarEdicionCampo("telefono")
    })
    $(".js-sexo-boton").click(() => {
        vista_Perfil_activarEdicionCampo("sexo")
    })
}
function vista_Perfil_guardarEdicion(evento) {
    /*
    Lo de evento.data es porque al usar .click el parametro se añade al evento
    https://stackoverflow.com/questions/3273350/jquerys-click-pass-parameters-to-user-function
    */
    var cambiosDetectados = []
    for (campo in GLOBAL_USUARIO.nuevosDatos) {
        if (GLOBAL_USUARIO.nuevosDatos.hasOwnProperty(campo) && GLOBAL_USUARIO.datos[campo] != GLOBAL_USUARIO.nuevosDatos[campo]) {
            cambiosDetectados.push(campo)
        }
    }
    if (cambiosDetectados.length > 0) {
        var html = ""
        cambiosDetectados.forEach(campo => {
            if (GLOBAL_USUARIO.datos[campo] == undefined) {
                html += `<div class="confirmacion-cambio">
                            <span class="confirmacion-cambio__titulo">Añadido ` + GLOBAL_USUARIO.diccionarioDatos[campo] + `</span>
                            <i class="fas fa-pencil-alt confirmacion-cambio__lapiz"></i>
                            <span class="confirmacion-cambio__nuevo">`
                if (campo === "sexo") {
                    switch (GLOBAL_USUARIO.nuevosDatos[campo]) {
                        case "H":
                            html += 'Hombre'
                            break
                        case "M":
                            html += 'Mujer'
                            break
                    }
                } else {
                    html += GLOBAL_USUARIO.nuevosDatos[campo]
                }
                html += `</span>
                        </div>`
            } else {
                html += `<div class="confirmacion-cambio">
                            <span class="confirmacion-cambio__antiguo">`
                if (campo === "sexo") {
                    switch (GLOBAL_USUARIO.datos[campo]) {
                        case "H":
                            html += 'Hombre'
                            break
                        case "M":
                            html += 'Mujer'
                            break
                    }
                } else {
                    html += GLOBAL_USUARIO.datos[campo]
                }
                html += `</span>`
                if (campo === "sexo") {
                    switch (GLOBAL_USUARIO.nuevosDatos[campo]) {
                        case "H": html += `<i class="fas fa-arrow-right confirmacion-cambio__flecha"></i>
                                            <span class="confirmacion-cambio__modificado">Hombre</span>
                                            </div>`
                            break
                        case "M": html += `<i class="fas fa-arrow-right confirmacion-cambio__flecha"></i>
                                            <span class="confirmacion-cambio__modificado">Mujer</span>
                                            </div>`
                            break
                        default:
                            html += `<i class="fas fa-trash confirmacion-cambio__papelera"></i>
                                     <span>Eliminado</span>
                            </div>`
                    }
                } else {
                    html += `<i class="fas fa-arrow-right confirmacion-cambio__flecha"></i>
                            <span class="confirmacion-cambio__modificado">`
                        + GLOBAL_USUARIO.nuevosDatos[campo]
                        + `</span>
                        </div>`
                }
            }
        })
        generarVentanaModal({
            titulo: "Confirmar cambios",
            tipo: "confirmacion",
            tamaño: "pequeño",
            callback_Confirmar: vista_Perfil_guardarNuevosDatos,
            callback_Denegar: () => { vista_Perfil_cambiarAFoto(GLOBAL_USUARIO.datos.foto) },
            callback_Cerrar: () => { vista_Perfil_cambiarAFoto(GLOBAL_USUARIO.datos.foto) },
            contenido: html
        })
    }
    delete GLOBAL_USUARIO.nuevosDatos
    vista_Perfil_generarHTML(evento.data)
}
function vista_Perfil_cambiarFoto(evento) {
    var datos = evento.originalEvent.dataTransfer;
    if (datos && datos.files.length) {
        evento.preventDefault();
        evento.stopPropagation();
        if (datos.files.length == 1) {
            var lector = new FileReader();
            lector.onload = $.proxy((archi, event) => {
                if (archi.type.match('image.*')) {
                    GLOBAL_USUARIO.nuevosDatos.foto = event.target.result
                    $(".js-ventana-modal").remove()
                    vista_Perfil_cambiarAFoto(GLOBAL_USUARIO.nuevosDatos.foto)
                } else {
                    if (!$(".c-selector-archivo__error").hasClass("c-selector-archivo__error--visible"))
                        $(".c-selector-archivo__error").addClass("c-selector-archivo__error--visible")
                }
            }, this, datos.files[0])
            lector.readAsDataURL(datos.files[0])
        } else {
            generarNotificacion("Por favor sube sólo una imagen png, jpg o gif")
            $(".js-ventana-modal").remove()
        }
    } else {
        generarNotificacion("Por favor sube sólo una imagen png, jpg o gif")
        $(".js-ventana-modal").remove()
    }
}
function vista_Perfil_comprobarValidezCampo(campo, botonAsociado) {
    if (campo.startsWith(".js-fechaNacimiento")) {
        var añoActual = new Date().getFullYear()
        var año = parseInt($(".js-fechaNacimiento-año-input").val())
        if (año >= añoActual - 120 && año <= añoActual) {
            var mes = parseInt($(".js-fechaNacimiento-mes-input").val())
            if (mes > 0 && mes < 13) {
                var dia = parseInt($(".js-fechaNacimiento-dia-input").val())
                if (dia > 0 && dia <= new Date(año, mes, 0).getDate()) {
                    $(botonAsociado).addClass("c-boton--exito").removeClass("c-boton--deshabilitado")
                    return true
                }
            }
        }
        $(botonAsociado).removeClass("c-boton--exito").addClass("c-boton--deshabilitado")
        return false
    }
    switch (campo) {
        case ".js-sexo-input":
            return true
        case ".js-telefono-input":
            if (
                /^\d+$/.test($(campo).val())
                && (
                    ($(campo).val().length == 9 && ($(campo).val().startsWith("6") || $(campo).val().startsWith("9")))
                    || ($(campo).val().length == 10 && $(campo).val().startsWith("7"))
                )
            ) {
                $(botonAsociado).addClass("c-boton--exito").removeClass("c-boton--deshabilitado")
                return true
            } else {
                $(botonAsociado).addClass("c-boton--deshabilitado").removeClass("c-boton--exito")
                return false
            }
        default:
            if (/^[a-z][a-z\s]*$/i.test($(campo).val()) && !$(campo).val().endsWith(" ") && $(campo).val().length > 2 && $(campo).val().match(/\S+/g).length < 5) {
                $(botonAsociado).addClass("c-boton--exito").removeClass("c-boton--deshabilitado")
                return true
            } else {
                $(botonAsociado).addClass("c-boton--deshabilitado").removeClass("c-boton--exito")
                return false
            }

    }
}
function vista_Perfil_activarEdicionCampo(campo) {
    switch (campo) {
        case "fechaNacimiento":
            $(".js-" + campo + "-contenido").html(`
            <input type="number" maxlength="2" size="2" placeholder="31" class="c-vista-perfil__input-nacimiento c-vista-perfil__input-numerico js-fechaNacimiento-dia-input"> /
            <input type="number" maxlength="2" size="2" placeholder="12" class="c-vista-perfil__input-nacimiento c-vista-perfil__input-numerico js-fechaNacimiento-mes-input"> /
            <input type="number" maxlength="4" size="4" placeholder="1969" class="c-vista-perfil__input-nacimiento c-vista-perfil__input-numerico js-fechaNacimiento-año-input">
            `)
            if (GLOBAL_USUARIO.datos.fechaNacimiento != undefined) {
                var fechaNacimiento = GLOBAL_USUARIO.datos.fechaNacimiento.split("/")
                $(".js-fechaNacimiento-dia-input").val(fechaNacimiento[0])
                $(".js-fechaNacimiento-mes-input").val(fechaNacimiento[1])
                $(".js-fechaNacimiento-año-input").val(fechaNacimiento[2])
            }
            $(".js-fechaNacimiento-dia-input").keyup((evento) => {
                vista_Perfil_comprobarValidezCampo(".js-fechaNacimiento-dia-input", ".js-fechaNacimiento-boton-contenido")
                if ($(".js-fechaNacimiento-dia-input").val().length == 2) {
                    $(".js-fechaNacimiento-mes-input").focus()
                }
                if (evento.key == "Enter") {
                    vista_Perfil_guardarCampo(campo)
                }
            })
            $(".js-fechaNacimiento-mes-input").keyup((evento) => {
                vista_Perfil_comprobarValidezCampo(".js-fechaNacimiento-mes-input", ".js-fechaNacimiento-boton-contenido")
                if ($(".js-fechaNacimiento-mes-input").val().length == 2) {
                    $(".js-fechaNacimiento-año-input").focus()
                }
                if (evento.key == "Enter") {
                    vista_Perfil_guardarCampo(campo)
                }
            })
            $(".js-fechaNacimiento-año-input").keyup((evento) => {
                vista_Perfil_comprobarValidezCampo(".js-fechaNacimiento-año-input", ".js-fechaNacimiento-boton-contenido")
                if (evento.key == "Enter") {
                    vista_Perfil_guardarCampo(campo)
                }
            })
            break
        case "sexo":
            $(".js-sexo-contenido").html(`
                <select class="c-vista-perfil__input js-sexo-input">
                                    <option value="H">Hombre</option>
                                    <option value="M">Mujer</option>
                                    <option value="S">Indefinido</option>
                                </select>`)
            break
        case "foto":
            generarVentanaModal({
                titulo: "Subir archivo",
                contenido: `<div class="c-selector-archivo js-selector-archivo">
                                <div class="c-selector-archivo__interno">
                                    <i class="fas fa-file-upload fa-4x c-selector-archivo__subida"></i>
                                    <p class="c-selector-archivo__texto-movil">Toca para subir un archivo</p>
                                    <p class="c-selector-archivo__texto-no-movil">Arrastra un archivo</p>
                                    <p class="c-selector-archivo__error">Por favor sube sólo una imagen png, jpg o gif</p>
                                </div>
                            </div>`
            })
            $('.js-selector-archivo').on({
                'dragover dragenter': (evento) => {
                    evento.preventDefault();
                    evento.stopPropagation();
                },
                'drop': vista_Perfil_cambiarFoto
            });
            break
        default:
            var html = `<input class='c-vista-perfil__input ` + (campo == "telefono" ? "c-vista-perfil__input-numerico" : "") + ` js-` + campo + `-input'`
            if (GLOBAL_USUARIO.nuevosDatos[campo] == undefined) {
                html += 'placeholder="' + (campo === "telefono" ? "6123456789" : GLOBAL_USUARIO.diccionarioDatos[campo]) + '"'
            }
            if (campo == "telefono") {
                html += 'type="number"'
            }
            html += ">"
            $(".js-" + campo + "-contenido").html(html)
            $(".js-" + campo + "-input").keyup((evento) => {
                vista_Perfil_comprobarValidezCampo(".js-" + campo + "-input", ".js-" + campo + "-boton-contenido")
                if (evento.key == "Enter") {
                    vista_Perfil_guardarCampo(campo)
                }
            })
    }
    $(".js-" + campo + "-boton-contenido").removeClass("fa-edit c-vista-perfil__edit-icono").addClass("fa-save c-boton c-boton--deshabilitado")
    if (campo === "sexo") {
        $(".js-sexo-boton-contenido").addClass("c-boton--exito").removeClass("c-boton--deshabilitado")
    }
    $(".js-" + campo + "-boton-cerrar").html("<i class='fas fa-times c-vista-perfil__edit-icono'></i>")
    $(".js-" + campo + "-boton-cerrar").click(() => {
        vista_Perfil_desactivarEdicionCampo(campo)
    })
    $(".js-" + campo + "-boton").off("click").click(() => {
        vista_Perfil_guardarCampo(campo)
    })
    if (GLOBAL_USUARIO.nuevosDatos[campo] != undefined && campo != "foto") {
        $(".js-" + campo + "-input").val(GLOBAL_USUARIO.nuevosDatos[campo])
        vista_Perfil_comprobarValidezCampo(".js-" + campo + "-input", ".js-" + campo + "-boton-contenido")
    }

}
function vista_Perfil_desactivarEdicionCampo(campo) {
    $(".js-" + campo + "-boton").off("click").click(() => {
        vista_Perfil_activarEdicionCampo(campo)
    })
    $(".js-" + campo + "-boton-contenido").addClass("fa-edit c-vista-perfil__edit-icono").removeClass("fa-save c-boton c-boton--deshabilitado c-boton--exito")
    if (GLOBAL_USUARIO.nuevosDatos[campo] != undefined) {
        if (campo === "sexo") {
            switch (GLOBAL_USUARIO.nuevosDatos.sexo) {
                case "H":
                    $(".js-" + campo + "-contenido").html("Hombre")
                    break
                case "M":
                    $(".js-" + campo + "-contenido").html("Mujer")
                    break
                default:
                    $(".js-" + campo + "-contenido").html("Añadir")
            }
        } else {
            $(".js-" + campo + "-contenido").html(GLOBAL_USUARIO.nuevosDatos[campo])
        }
    } else {
        $(".js-" + campo + "-contenido").html((campo === "apellidos" ? "Apellidos" : "Añadir"))
    }
    $(".js-" + campo + "-boton-cerrar").html("")
}
function vista_Perfil_guardarCampo(campo) {
    if (vista_Perfil_comprobarValidezCampo(".js-" + campo + "-input", ".js-" + campo + "-boton-contenido")) {
        switch (campo) {
            case "fechaNacimiento":
                GLOBAL_USUARIO.nuevosDatos.fechaNacimiento = $(".js-fechaNacimiento-dia-input").val() + "/" + $(".js-fechaNacimiento-mes-input").val() + "/" + $(".js-fechaNacimiento-año-input").val()
                break
            case "sexo":
                var valor = $(".js-sexo-input").val()
                if (valor == "H" || valor == "M") {
                    GLOBAL_USUARIO.nuevosDatos.sexo = valor
                }
                else {
                    GLOBAL_USUARIO.nuevosDatos.sexo = undefined
                }
                break
            default:
                GLOBAL_USUARIO.nuevosDatos[campo] = $(".js-" + campo + "-input").val()
        }
        vista_Perfil_desactivarEdicionCampo(campo)
    }
}
function vista_Perfil_guardarNuevosDatos() {
    // Todo
    generarNotificacion("Se ha actualizado tu perfil", true)
}
function vista_Perfil_cambiarAFoto(foto) {
    $(".js-foto").attr("src", foto)
    $(".c-cabecera__imagen").attr("src", foto)
    $(".c-perfil__imagen").attr("src", foto)
}