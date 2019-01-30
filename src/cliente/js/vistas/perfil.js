function vista_Perfil(puntoMontaje) {
    montarMenu("/api/menu", "perfil")
    var usuario = {
        foto: "imagenes/usuarios/funny-pic-of-donald-trump.jpg",
        nombre: "Baldomero Gilberto",
        apellidos: "Zuzunaga Cacharro",
        nick: "Adaying1986",
        ubicaciones =[
            "Avda. Los llanos, 73 26270 Ojacastro",
            "Avda. Los llanos, 23 26270 Ojacastro",
            "Avda. Los llanos, 523 26270 Ojacastro",
        ],
        fechaNacimiento: "4/1/86",
        metodosPago: [
            { titulo: "MasterCard", valor: "**** **** **** 4742, 9/2024" }
        ],
        telefono: "+34 761 260 263",
        contraseña: "Uquuwah6ang",
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
                    { id: 2, cantidad: 3 }
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
                    { id: 4, cantidad: 2 }
                ]
            }
        ]
    }
    if (usuario.metodosPago.length == 0) {
        var metodosPago = "<p>No tienes métodos de pago</p>"
    } else {
        var metodosPago = ""
        usuario.metodosPago.forEach(tarjeta => {
            metodosPago += "<div><span>" + tarjeta.titulo + "</span><span>" + tarjeta.valor + "</span></div>"
        })
    }
    if (usuario.pedidos.length == 0) {
        var pedidos = "<p>No tienes pedidos</p>"
    } else {
        var pedidos = ""
        for (var x = 1; x < usuario.pedidos.length - 1 && x < 4; x++) {
            var pedido = usuario.pedidos[usuario.pedidos.length - x]
            pedidos += "<div><span>" + pedido.id + "</span><span>Compra:" + pedido.fechaCompra + "</span><span>" + pedido.articulos.length + " artículos</span></div>"
        }
        if (usuario.pedidos.length > 3) {
            pedidos += "<p class='c-boton c-boton--basico'>" + (usuario.pedidos.length - 3) + " mas...</p>"
        }
    }
    $(puntoMontaje).html(`<div class="c-perfil">
                            <div class="c-perfil__usuario">
                            <div class='c-perfil__foto-contenedor'>
                                <img class='c-perfil__foto' src='`+ usuario.foto + `'>
                            </div>
                            <p class='c-perfil__nombre'>`+ usuario.nombre + `</p>
                            <p class='c-perfil__apellidos'>`+ usuario.apellidos + `</p>
                            <p class='c-perfil__nick'>Nick: `+ usuario.nick + `</p>
                            <p class='c-perfil__contraseña'>Contraseña: `+ usuario.contraseña + `</p>
                            <p class='c-perfil__nacimiento'>Nacimiento: `+ usuario.fechaNacimiento + `</p>
                            <p class='c-perfil__telefono'>Tlf: `+ usuario.telefono + `</p>
                            </div>
                            <div class="c-perfil__detalles">
                            <div class='c-perfil__metodos-pago'>`+ metodosPago + `</div>
                            <div class='c-perfil__pedidos'>`+ pedidos + `</div>
                            <p class='c-boton c-boton--basico c-perfil__ubicaciones'>Mis ubicaciones</p>
                            </div>
                            </div>`)

}