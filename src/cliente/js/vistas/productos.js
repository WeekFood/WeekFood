function vista_Productos(puntoMontaje) {
    montarMenu("/api/menu", "productos")
    var html = "";
    html += "<div class='c-productos__container'>";
    return $.when($.getJSON("/api/productos").then((productos) => {
        productos.forEach(producto => {
            html += "<div class='c-principal c-producto c-producto__container'>";
            html += "</i><img class='c-producto__imagen' src='/imagenes/productos/" + producto["foto"] + "'>";
            html += "<div class='c-producto__datos'>";
            if (producto["destacado"] == 1) {
            html += "<div class='c-producto__imagen-destacado'><i class='fas fa-star'></i></div>";
            } 
            html += "<p class='c-producto__titulo'>" + producto["nombre"].charAt(0).toUpperCase() + producto["nombre"].slice(1) + "</p>";
            html += "<div class='c-producto__precio-carrito'><div class='c-producto__precio'>PRECIO</div>";
            html += "<div class='c-producto__carrito'><button class='c-producto__carrito'><i class='fas fa-cart-plus'></i></button></div></div></div></div>";
        })
        html += "</div>";
    }
    )).then(() => {
        $(puntoMontaje).html(html);
    })

}