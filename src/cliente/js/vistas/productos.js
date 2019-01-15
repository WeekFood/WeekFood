function vista_Productos(puntoMontaje) {
    // Codigo con propositos de testeo {
    // Estos se cargaran al llegar aqui.
    GLOBAL_GESTOR_PRODUCTOS.getCategoriasEnCategoriaPrincipal('Carnes').then((categorias)=>{console.log("En carnes",categorias)})
    console.log("Producto 10",GLOBAL_GESTOR_PRODUCTOS.getProductoId(10))
    // } Codigo con propositos de testeo 
    
    montarMenu("/api/menu", "productos")
    var html = "";
    return $.when( GLOBAL_CACHE_JSONS.getJSON("/api/productos").then((productos) => {
        productos.forEach(producto => {
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