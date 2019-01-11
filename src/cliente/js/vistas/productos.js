function vista_Productos(puntoMontaje) {
    montarMenu("/api/menu", "productos")
    var html = "";
    return $.when($.getJSON("/api/productos").then((productos) => {
        productos.forEach(producto => {
            html += "<div class='c-producto c-producto__container";
            if (producto["destacado"] == 1) {
            html += " c-producto--destacado'>";
            html += "<img class='c-producto__imagen-destacado' src='/imagenes/estrella.png'>";
            html += "<img class='c-producto__imagen' src='/imagenes/productos/" + producto["foto"] + "'>";
            html += "<p class='c-producto__titulo'>" + producto["nombre"].charAt(0).toUpperCase() + producto["nombre"].slice(1) + "</p></div>";
            } else {
            html += "'>";
            html += "<img class='c-producto__imagen' src='/imagenes/productos/" + producto["foto"] + "'>";
            html += "<p class='c-producto__titulo'>" + producto["nombre"].charAt(0).toUpperCase() + producto["nombre"].slice(1) + "</p></div>";
            }
        })
    }
    )).then(() => {
        $(puntoMontaje).html(html);
    })

}