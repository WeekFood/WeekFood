function carrito_Alternar() {
    if ($(".c-carrito").length < 1) {
        $(".p-principal").prepend(`<div class='c-carrito c-principal'></div>`)
    } else {
        $(".c-carrito").toggleClass("c-carrito--desaparecer")
    } carrito_Actualizar()
}
function carrito_Actualizar() {
    var html = ""
    if (carrito.getArticulos().length < 1) {
        html = "<p class='c-carrito__vacio'><i class='far fa-sad-cry fa-3x'></i><br><br>Tu carrito está vacio</p>"
    } else {
        carrito.getArticulos().slice(Math.max(carrito.getArticulos().length - 5, 0)).forEach((articulo) => { html += carrito_ProcesarArticulo(articulo) })
        html += `
            <p class='c-carrito__articulo c-carrito__botones'>
            <span class='c-boton c-boton--basico'>(`+carrito.getArticulos().length +`) Ver mi carrito </span>
            <span class='c-boton c-boton--exito'>`+carrito.getImporteTotal()+`€</span>
            </p>
            `
    }
    $(".c-carrito").html(html)
    carrito_ActualizarTriggers()
}
function carrito_AñadirArticulo() {
    var id = Math.round(Math.random() * 100)
    let productoDesdeAPI = new Producto(
        id,
        'Patatas fritas ' + id.toString(),
        'patatas-fritas.png',
        false
    );
    //var id = $(this).parent().data('id')
    carrito.añadirProducto(productoDesdeAPI)//productos.getProductoPorId(id)))
    carrito_Actualizar()
    return id;
}
function carrito_ProcesarArticulo(articulo) {
    var html = `<p data-id='` + articulo.id + `' class='c-carrito__articulo'>
    <span class='c-carrito__nombre js-carrito-nombre'>`+ articulo.nombre + `</span>
    <span class='c-carrito__operador js-carrito-incremento'><i class="fas fa-plus"></i></span>
    <span class='c-carrito__cantidad js-carrito-cantidad'>`+ articulo.cantidad + `</span>
    <span class='c-carrito__operador js-carrito-decremento'><i class="fas fa-minus"></i></span>
    <span class='c-carrito__basura js-carrito-basura'><i class="far fa-trash-alt"></i></span>
    </p>`
    return html
}
function carrito_QuitarArticulo(elemento) {
    carrito.quitarArticulo($(elemento.currentTarget).parent().data('id'))
    carrito_Actualizar()
}
function carrito_IncrementarArticulo(elemento) {
    var cantidadActual = carrito.incrementarCantidad($(elemento.currentTarget).parent().data('id'))
    $($(elemento.currentTarget).parent().find('.js-carrito-cantidad')[0]).html(cantidadActual)
}
function carrito_DecrementarArticulo(elemento) {
    var cantidadActual = carrito.decrementarCantidad($(elemento.currentTarget).parent().data('id'))
    $($(elemento.currentTarget).parent().find('.js-carrito-cantidad')[0]).html(cantidadActual)
}
function carrito_ActualizarTriggers() {
    $(".js-carrito-incremento").on('click', carrito_IncrementarArticulo);
    $(".js-carrito-decremento").on('click', carrito_DecrementarArticulo);
    $(".js-carrito-basura").on('click', carrito_QuitarArticulo);
}