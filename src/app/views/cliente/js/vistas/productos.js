function vista_Productos(puntoMontaje) {
    montarMenu("/api/menu/portada", "productos")
    var html = "";
    return $.when($.getJSON("/api/productos").then((datos) => {
        datos["data"].forEach(producto => {
            html += "<div class='c-principal c-producto";
            if (producto["destacado"] == 1) {
                html += " c-producto--destacado'> <img class='c-producto__imagen-destacado' src='imagenes/estrella.png";
            }
            html += "'><img class='c-producto__imagen' src='/imagenes/productos/" + producto["foto"] + "'>";
            html += "<p class='c-producto__titulo'>" + producto["nombre"].charAt(0).toUpperCase() + producto["nombre"].slice(1) + "</p></div>";
        })
    }
    )).then(() => {
        $(puntoMontaje).html(html);
    })

}