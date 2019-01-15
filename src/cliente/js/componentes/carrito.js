function alternarCarrito() {
    if ($(".c-carrito").length < 1) {
        var html = "<div class='c-carrito c-principal'>"
        carrito.getArticulos().forEach(articulo => {
            html += `<p class='c-carrito__articulo'>
            <span class='c-carrito__nombre'>`+ articulo.nombre + `</span>
            <span class='c-carrito__incrementar'><i class="fas fa-plus"></i></span>
            <span class='c-carrito__cantidad'>`+ articulo.cantidad + `</span>
            <span class='c-carrito__decrementar'><i class="fas fa-minus"></i></span>
            <span class='c-carrito__basura'><i class="far fa-trash-alt"></i></span>
            </p>`
        });
        html += "</div>"
        $(".p-principal").prepend(html)
    } else {
        $(".c-carrito").addClass("c-carrito--desaparecer")
        setTimeout(()=>{$(".c-carrito").remove()}, 501)
    }
}