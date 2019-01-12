function vista_Productos(puntoMontaje) {
    montarMenu("/api/menu", "productos")
    var html = "";
    html += "<div class='c-productos__container'>";
    return $.when($.getJSON("/api/productos").then((productos) => {
        productos.forEach(producto => {
            html += "<div class='c-principal c-producto__container";
            if (producto["destacado"] == 1) {
            html += " c-producto--destacado'>";//Pensar en si se hace algo con esto
            html += "<div class='c-producto__imagen-destacada'><i class='fas fa-star'></i></div>";
            html += "<img class='c-producto__imagen' src='/imagenes/productos/" + producto["foto"] + "'>";
            html += "<div class='c-producto__carrito'><i class='fas fa-shopping-cart'></i></div>";
            html += "<p class='c-producto__titulo'>" + producto["nombre"].charAt(0).toUpperCase() + producto["nombre"].slice(1) + "</p></div>";
            } else {
            html += "'>";
            html += "<img class='c-producto__imagen' src='/imagenes/productos/" + producto["foto"] + "'>";
            //html += "<img class='c-producto__carrito' src='/imagenes/carrito.png'>";
            html += "<div class='c-producto__carrito'><i class='fas fa-shopping-cart'></i></div>";
            html += "<p class='c-producto__titulo'>" + producto["nombre"].charAt(0).toUpperCase() + producto["nombre"].slice(1) + "</p></div>";
            }
        })
        html += "</div>";
    }
    )).then(() => {
        $(puntoMontaje).html(html);
    })

}