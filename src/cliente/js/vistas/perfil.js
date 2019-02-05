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
        fechaNacimiento: "4/1/86",
        metodosPago: [
            { titulo: "MasterCard", valor: "**** **** **** 4742, 9/2024" },
            { titulo: "Visa", valor: "**** **** **** 4772, 8/2030" },
            { titulo: "Paypal", valor: "**** **** **** 4572, 1/2028" },
            { titulo: "Visa", valor: "**** **** **** 9782, 9/2022" },
            { titulo: "MasterCard", valor: "**** **** **** 1457, 10/2024" }
        ],
        telefono: "+34 761 260 263",
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
    var contraseña = ""
    for (var x = 0; x < 5; x++) {
        contraseña += "&#9899"
    }
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
                        <img class='c-vista-perfil__foto' src='`+ GLOBAL_USUARIO.foto + `'>
                    </div>
                </div>`
        + (GLOBAL_USUARIO.nombre != undefined ? (`<p class='c-vista-perfil__nombre'>` + GLOBAL_USUARIO.nombre + `</p>`) : "")
        + (GLOBAL_USUARIO.apellidos != undefined ? (`<p class='c-vista-perfil__apellidos'>` + GLOBAL_USUARIO.apellidos + `</p>`) : "")
        + `     <div class='c-vista-perfil__nick-pass' >
                    <p class='c-vista-perfil__dato'>
                        <span>Nick</span>
                        <span>`+ GLOBAL_USUARIO.nick + `</span>
                    </p>
                    <p class='c-vista-perfil__dato'>
                        <span>Contraseña</span>
                        <span class="js-vista-perfil__contra">`+ contraseña + `</span>
                    </p>
                        </div>
            <div class='c-vista-perfil__otros-datos'>`
        + (GLOBAL_USUARIO.fechaNacimiento != undefined ? (`<p class='c-vista-perfil__dato'><span>Nacimiento</span><span>` + GLOBAL_USUARIO.fechaNacimiento + `</span></p>`) : "")
        + (GLOBAL_USUARIO.telefono != undefined ? (`<p class='c-vista-perfil__dato'><span>Teléfono</span><span>` + GLOBAL_USUARIO.telefono + `</span></p>`) : "")

    if (GLOBAL_USUARIO.sexo == "H" || GLOBAL_USUARIO.sexo == "M") {
        html += `   <p class='c-vista-perfil__dato'>
                        <span>Género</span>
                        <span>`
        switch (GLOBAL_USUARIO.sexo) {
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
    /*
    Lo de evento.data es porque al usar .click el parametro se añade al evento
    https://stackoverflow.com/questions/3273350/jquerys-click-pass-parameters-to-user-function
    */
    $(".c-vista-perfil").addClass("c-vista-perfil--edicion")
    $(".js-edicion-texto").html("Guardar")

    var contraseña = ""
    for (var x = 0; x < 5; x++) {
        contraseña += "&#9899"
    }
    var html =
        `<div class="c-vista-perfil">
        <div class="c-vista-perfil__edicion c-boton c-boton--basico js-edicion-general">
            <i class='fas fa-edit js-edicion-general-icono'></i> 
            <span class="js-edicion-texto">Guardar</span>
        </div>
        <div class="c-vista-perfil__usuario">
            <div class='c-vista-perfil__foto-relativo'>
                <div class='c-vista-perfil__foto-contenedor'>
                    <img class='c-vista-perfil__foto' src='`+ GLOBAL_USUARIO.foto + `'>
                </div>
            </div>
            <p class='c-vista-perfil__nombre c-vista-perfil__nombre-editable'>
                <span class="js-nombre-boton">
                    <i class='fas fa-edit c-vista-perfil__edit-icono js-nombre-boton-contenido'></i>
                </span>
                <span class="js-nombre-contenido">`
        + (GLOBAL_USUARIO.nombre != undefined ? GLOBAL_USUARIO.nombre : "Nombre")
        + `     </span>
            </p>
            <p class='c-vista-perfil__apellidos c-vista-perfil__apellidos-editable'>
                <span class="js-apellidos-boton">
                    <i class='fas fa-edit c-vista-perfil__edit-icono'></i>
                </span>
                <span class="js-apellidos-contenido">`
        + (GLOBAL_USUARIO.apellidos != undefined ? GLOBAL_USUARIO.apellidos : "Apellidos")
        + `     </span>
            </p>
            <div class='c-vista-perfil__nick-pass' >
                <p class='c-vista-perfil__dato'>
                    <span>Nick</span>
                    <span>`
        + GLOBAL_USUARIO.nick
        + `         </span>
                </p>
                <p class='c-vista-perfil__dato'>
                    <span>Contraseña</span>
                    <span class="js-contra">
                        <i class='fas fa-edit c-vista-perfil__edit-icono'></i>`
        + contraseña
        + `         </span>
                </p>
            </div >
            <div class='c-vista-perfil__otros-datos'>
                <p class='c-vista-perfil__dato js-fechaNacimiento'>
                    <span>Nacimiento</span>
                    <span>
                        <i class='fas fa-edit c-vista-perfil__edit-icono'></i>`
        + (GLOBAL_USUARIO.fechaNacimiento != undefined ? GLOBAL_USUARIO.fechaNacimiento : "Añadir")
        + `         </span>
                </p>
                <p class='c-vista-perfil__dato js-telefono'>
                    <span>Teléfono</span>
                    <span>
                        <i class='fas fa-edit c-vista-perfil__edit-icono'></i>`
        + (GLOBAL_USUARIO.telefono != undefined ? GLOBAL_USUARIO.telefono : "Añadir")
        + `         </span>
                </p>
                <p class='c-vista-perfil__dato js-sexo'>
                    <span>Género</span>
                    <span>
                        <i class='fas fa-edit c-vista-perfil__edit-icono'></i>`

    switch (GLOBAL_USUARIO.sexo) {
        case "H":
            html += "Hombre"
            break
        case "M":
            html += "Mujer"
            break
        default:
            html += "Añadir"
    }

    html += `       </span>
                </p>
            </div>
        </div>
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
            click: () => {
                generarVentanaModal({
                    titulo: "Subir archivo",
                    contenido: `
                                    <div class="c-selector-archivo js-selector-archivo">
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
            },

            mouseleave: () => {
                $(".c-vista-perfil__foto-edit").remove()
            }
        });
    $(".js-nombre-boton").click(() => {
        vista_Perfil_activarEdicionCampo("nombre")
    })
    $(".js-apellidos").click(() => { })
}
function vista_Perfil_guardarEdicion(evento) {
    /*
    Lo de evento.data es porque al usar .click el parametro se añade al evento
    https://stackoverflow.com/questions/3273350/jquerys-click-pass-parameters-to-user-function
    */
    /*
    $(".js-edicion-general").off("click").on("click", vista_Perfil_activarEdicion)
    $(".js-edicion-general-icono").removeClass("fa-save").addClass("fa-edit")
    $(".c-vista-perfil").removeClass("c-vista-perfil--edicion")
    $(".js-edicion-texto").html("Editar")
    $(".c-vista-perfil__foto").off()
    */
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
                    GLOBAL_USUARIO.foto = event.target.result
                    $(".js-ventana-modal").remove()
                    cargarVista("perfil")
                    $(".c-cabecera__imagen").attr("src", GLOBAL_USUARIO.foto)
                    $(".c-perfil__imagen").attr("src", GLOBAL_USUARIO.foto)
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
    if (/^[a-z][a-z\s]*$/i.test($(campo).val()) && $(campo).val().length > 2) {
        if (!$(campo).hasClass("c-boton--exito")) {
            $(botonAsociado).addClass("c-boton--exito").removeClass("c-boton--deshabilitado")
        }
        return true
    } else {
        if (!$(campo).hasClass("c-boton--deshabilitado")) {
            $(botonAsociado).addClass("c-boton--deshabilitado").removeClass("c-boton--exito")
        }
        return false
    }
}
function vista_Perfil_activarEdicionCampo(campo) {
    $(".js-" + campo + "-boton").off("click").click(() => {
        vista_Perfil_guardarCampo(campo)
    })
    $(".js-" + campo + "-boton-contenido").removeClass("fa-edit c-vista-perfil__edit-icono").addClass("fa-save c-boton c-boton--deshabilitado")
    $(".js-" + campo + "-contenido").html("<input class='c-vista-perfil__input js-" + campo + "-input' placeholder='" + (GLOBAL_USUARIO[campo] != undefined ? GLOBAL_USUARIO[campo] : campo) + "'>")
    $(".js-" + campo + "-input").keyup((evento) => {
        if (vista_Perfil_comprobarValidezCampo(".js-" + campo + "-input", ".js-" + campo + "-boton-contenido") && evento.key == "Enter") {
            vista_Perfil_guardarCampo(campo)
        }
    })
}
function vista_Perfil_desactivarEdicionCampo(campo) {
    $(".js-" + campo + "-boton").off("click").click(() => {
        vista_Perfil_activarEdicionCampo(campo)
    })
    $(".js-" + campo + "-boton-contenido").addClass("fa-edit c-vista-perfil__edit-icono").removeClass("fa-save c-boton c-boton--deshabilitado c-boton--exito")
    $(".js-" + campo + "-contenido").html((GLOBAL_USUARIO[campo] != undefined ? GLOBAL_USUARIO[campo] : campo))
}
function vista_Perfil_guardarCampo(campo) {
    if (vista_Perfil_comprobarValidezCampo(".js-" + campo + "-input", ".js-" + campo + "-boton-contenido")) {
        GLOBAL_USUARIO[campo] = $(".js-" + campo + "-input").val()
        vista_Perfil_desactivarEdicionCampo(campo)
    }
}