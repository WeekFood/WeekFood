function vista_Productos(puntoMontaje) {
    montarMenu("/api/menu", "productos")
    var containerDestacado = "<div class='c-productos'>";
    var containerNoDestacado = "<div class='c-productos'>";
    return $.when( GLOBAL_CACHE_JSONS.getJSON("/api/productos").then((productos) => {
        productos.forEach(producto => {
            if (producto["destacado"] == 1) {
                containerDestacado += vista_Producto_generarProducto(producto);
            } else {
                containerNoDestacado += vista_Producto_generarProducto(producto);
            }
        })
        containerDestacado += "</div>";
        containerNoDestacado += "</div>";
    }
    )).then(() => {
        $(puntoMontaje).html(containerDestacado + containerNoDestacado);
    })
}

function vista_Producto_generarProducto(producto){
    var html = "";
    html += "<div class='c-producto'>";
    html += "</i><img class='c-producto__imagen' src='/imagenes/productos/" + producto["foto"] + "'>";
    if (producto["destacado"] == 1) {
        html += "<div class='c-producto__imagen-destacado'><i class='fas fa-star fa-3x'></i></div>";
        }
    html += "<p class='c-producto__titulo'>" + producto["nombre"] + "</p>";
    html += "<div class='c-producto__precio'>2 €</div>";
    html += "<div class='c-producto__carrito'><i class='fas fa-cart-plus'></i></div></div>";
    return html;
}