function vista_Perfil(puntoMontaje) {
    montarMenu("/api/menu", "perfil")
    var usuario = {
        foto: "imagenes/usuarios/perfil.png",
        nombre: "Baldomero Parra Padrón",
        nick: "Adaying1986",
        ubicaciones =[
            "Avda. Los llanos, 73 26270 Ojacastro",
            "Avda. Los llanos, 23 26270 Ojacastro",
            "Avda. Los llanos, 523 26270 Ojacastro",
        ],
        fechaNacimiento: "4/1/86",
        tarjetas: {
            "MasterCard": "**** **** **** 4742, 9/2024"
        },
        telefono: "+34 761 260 263",
        contraseña: "Uquuwah6ang",
        pedidos: [
            {
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
    $(puntoMontaje).html(`<div class="c-perfil">
                            <img class='c-perfil__foto' src='`+ usuario.foto + `'>
                            <p class='c-perfil__nombre-nombre'>`+ usuario.nombre + `</p>
                            </div>`)

}