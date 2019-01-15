function alternarCarrito() {
    if ($(".c-carrito").length < 1) {
        $(".p-principal").prepend("<div class='c-carrito c-principal'></div>")
        carrito.getArticulos().forEach(articulo => {
            procesarArticulo(articulo);
        });
        $(".js-carrito-basura").on('click', quitarArticulo);
    } else {
        $(".c-carrito").toggleClass("c-carrito--desaparecer")
    }
}
function añadirArticulo() {
    var id = $(this).parent().data('id')
    procesarArticulo(carrito.añadirProducto(productos.getProductoPorId(id)))
    $(".js-carrito-basura").on('click', quitarArticulo);
    $(".c-carrito__vacio").remove()
}
function procesarArticulo(articulo) {
    var html = `<p data-id='` + articulo.id + `' class='c-carrito__articulo'>
    <span class='c-carrito__nombre'>`+ articulo.nombre + `</span>
    <span class='c-carrito__operador'><i class="fas fa-plus"></i></span>
    <span class='c-carrito__cantidad'>`+ articulo.cantidad + `</span>
    <span class='c-carrito__operador'><i class="fas fa-minus"></i></span>
    <span class='c-carrito__basura js-carrito-basura'><i class="far fa-trash-alt"></i></span>
    </p>`
    $(".c-carrito").append(html)
}
function quitarArticulo(elemento) {
    console.log(elemento.currentTarget)
    console.log($(elemento.currentTarget).parent())
    console.log($(elemento.currentTarget).parent().data('id'))
    carrito.quitarArticulo($(elemento.currentTarget).parent().data('id'))
    $(elemento.currentTarget).parent().remove()
    if($(".c-carrito").children().length < 1){
$(".c-carrito").append("<p class='c-carrito__vacio'><i class='far fa-sad-cry fa-3x'></i><br><br>Tu carrito está vacio</p>")
    }
}