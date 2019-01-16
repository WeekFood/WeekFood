function carrito_Alternar() {
    if ($(".c-carrito").length < 1) {
        $(".p-principal").prepend("<div class='c-carrito c-principal'></div>")
        carrito.getArticulos().forEach(articulo => {
            carrito_ProcesarArticulo(articulo);
        });
        $(".js-carrito-incremento").on('click', carrito_IncrementarArticulo);
        $(".js-carrito-decremento").on('click', carrito_DecrementarArticulo);
        $(".js-carrito-basura").on('click', carrito_QuitarArticulo);
    } else {
        $(".c-carrito").toggleClass("c-carrito--desaparecer")
    }
}
function carrito_AñadirArticulo() {
    var id = $(this).parent().data('id')
    carrito_ProcesarArticulo(carrito.añadirProducto(productos.getProductoPorId(id)))
    $(".js-carrito-basura").on('click', quitarArticulo);
    $(".c-carrito__vacio").remove()
}
function carrito_ProcesarArticulo(articulo) {
    var html = `<p data-id='` + articulo.id + `' class='c-carrito__articulo'>
    <span class='c-carrito__nombre js-carrito-nombre'>`+ articulo.nombre + `</span>
    <span class='c-carrito__operador js-carrito-incremento'><i class="fas fa-plus"></i></span>
    <span class='c-carrito__cantidad js-carrito-cantidad'>`+ articulo.cantidad + `</span>
    <span class='c-carrito__operador js-carrito-decremento'><i class="fas fa-minus"></i></span>
    <span class='c-carrito__basura js-carrito-basura'><i class="far fa-trash-alt"></i></span>
    </p>`
    $(".c-carrito").append(html)
}
function carrito_QuitarArticulo(elemento) {
    carrito.quitarArticulo($(elemento.currentTarget).parent().data('id'))   
    $(elemento.currentTarget).parent().remove()
    if ($(".c-carrito").children().length < 1) {
        $(".c-carrito").append("<p class='c-carrito__vacio'><i class='far fa-sad-cry fa-3x'></i><br><br>Tu carrito está vacio</p>")
    }
}
function carrito_IncrementarArticulo(elemento){
    var cantidadActual = carrito.incrementarCantidad($(elemento.currentTarget).parent().data('id'))
    $($(elemento.currentTarget).parent().find('.js-carrito-cantidad')[0]).html(cantidadActual)
}
function carrito_DecrementarArticulo(elemento){
    var cantidadActual = carrito.decrementarCantidad($(elemento.currentTarget).parent().data('id'))
    $($(elemento.currentTarget).parent().find('.js-carrito-cantidad')[0]).html(cantidadActual)
}