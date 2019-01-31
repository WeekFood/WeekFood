function vista_Perfil(puntoMontaje) {
    montarMenu("/api/menu", "perfil")
    var usuario = {
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
    }
    var contraseña = ""
    for (var x = 0; x < 10; x++) {
        contraseña += "&#9899"
    }
    if (usuario.metodosPago.length == 0) {
        var metodosPago = "<p>No tienes métodos de pago</p>"
    } else {
        var metodosPago = `<div class='c-vista-perfil__metodos-pago-inicio'>
        <p class='c-vista-perfil__titulo'>Métodos de pago</p></div>`

        for (var x = 1; x < usuario.metodosPago.length - 1 && x < 4; x++) {
            var metodoPago = usuario.metodosPago[usuario.metodosPago.length - x]
            metodosPago += `<div class='c-vista-perfil__metodo-pago'>
            <span>` + metodoPago.titulo + `</span>
            <span'>` + metodoPago.valor + `</span>
            </div>`
        }
        if (usuario.metodosPago.length > 3) {
            metodosPago += `<div class='c-vista-perfil__metodos-pago-final'>
                        <p class='c-boton c-boton--basico c-vista-perfil__boton'>` + (usuario.metodosPago.length - 3) + " mas...</p></div>"
        }
    }
    if (usuario.pedidos.length == 0) {
        var pedidos = "<p>No tienes pedidos</p>"
    } else {
        var pedidos = `<div class='c-vista-perfil__pedidos-inicio'>
        <p class='c-vista-perfil__titulo'>Pedidos</p></div>`
        for (var x = 1; x < usuario.pedidos.length - 1 && x < 4; x++) {
            var pedido = usuario.pedidos[usuario.pedidos.length - x]
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
        if (usuario.pedidos.length > 3) {
            pedidos += `<div class='c-vista-perfil__pedidos-final'>
                        <p class='c-boton c-boton--basico c-vista-perfil__boton'>` + (usuario.pedidos.length - 3) + " mas...</p></div>"
        }
    }
    var html =
        `<div class="c-vista-perfil">
            <div class="c-vista-perfil__usuario">
                <div class='c-vista-perfil__foto-contenedor'>
                    <img class='c-vista-perfil__foto' src='`+ GLOBAL_USUARIO.foto + `'>
                </div>
                <p class='c-vista-perfil__nombre'>`+ GLOBAL_USUARIO.nombre + `</p>
                <p class='c-vista-perfil__apellidos'>`+ GLOBAL_USUARIO.apellidos + `</p>
                <div class='c-vista-perfil__nick-pass'>
                    <p class='c-vista-perfil__dato'>
                        <span>Nick</span>
                        <span>`+ GLOBAL_USUARIO.nick + `</span>
                    </p>
                    <p class='c-vista-perfil__dato'>
                        <span>Contraseña</span>
                        <span>`+ contraseña + `</span>
                    </p>
                </div>
                <div class='c-vista-perfil__otros-datos'>
                    <p class='c-vista-perfil__dato'>
                        <span>Nacimiento</span>
                        <span>`+ usuario.fechaNacimiento + `</span>
                    </p>
                    <p class='c-vista-perfil__dato'>
                        <span>Teléfono</span>
                        <span>` + usuario.telefono + `</span>
                    </p>
                    <p class='c-vista-perfil__dato'>
                        <span>Sexo</span>
                        <span>`
    switch (GLOBAL_USUARIO.sexo) {
        case "H":
            html += "Hombre"
            break
        case "M":
            html += "Mujer"
            break
        default:
            html += "Indefinido"
    }
    html += `           </span>
                    </p>
                </div>
            </div>
            <div class="c-vista-perfil__detalles">
            <div class='c-vista-perfil__metodos-pago'>`+ metodosPago + `</div>
            <div class='c-vista-perfil__pedidos'>`+ pedidos + `</div>
            <p class='c-boton c-boton--basico c-vista-perfil__ubicaciones c-vista-perfil__boton'>Mis ubicaciones</p>
        </div>
    </div>`

    $(puntoMontaje).html(html)
}