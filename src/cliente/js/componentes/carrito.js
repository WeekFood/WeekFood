function carrito_Alternar() {
    if ($(".c-carrito").length < 1) {
        $(".p-principal").prepend(`<div class='c-carrito'></div>`)
    } else {
        $(".c-carrito").toggleClass("c-carrito--desaparecer")
        $(".js-carrito").children(".c-cabecera__notificacion").remove()
    } 
    $(".js-carrito").children("i").toggleClass("fa-angle-up").toggleClass("fa-shopping-cart")
    carrito_Actualizar()
}
function carrito_Actualizar() {
    var html = ""
    if (carrito.getArticulos().length < 1) {
        html = "<p class='c-carrito__vacio'><i class='far fa-sad-cry fa-3x'></i><br><br>Tu carrito está vacio</p>"
    } else {
        carrito.getArticulos().slice(Math.max(carrito.getArticulos().length - 5, 0)).forEach((articulo) => { html += carrito_ProcesarArticulo(articulo) })
        html += `
            <p class='c-carrito__articulo c-carrito__botones'>
            <span class='c-boton c-boton--basico js-carrito-ver-carrito'>(`+ carrito.getArticulos().length + `) Ver mi carrito </span>
            <span class='c-boton c-boton--exito c-carrito__boton js-carrito-pagar'>`+precioEnEuros(carrito.getImporteTotal()) + `</span>
            </p>
            `
    }
    $(".c-carrito").html(html)
    carrito_ActualizarTriggers()
}
function carrito_AñadirArticulo(id) {
    var producto = GLOBAL_GESTOR_PRODUCTOS.getProductoId(id)
    carrito.añadirProducto(producto)
    carrito_Actualizar()
    producto = carrito.getArticulo(producto.id)
    if (producto.cantidad > 1) {
        generarNotificacion(producto.nombre + " tienes " + producto.cantidad + " unidades.", true)
    } else {
        generarNotificacion(producto.nombre + " añadido al carrito.", true)
    }
    if (carrito.getArticulos().length == 1 && carrito.getArticulos()[0].cantidad == 1){
        carrito_Alternar() 
    }
    if ($(".c-carrito").hasClass('c-carrito--desaparecer')){
        if ($(".js-carrito").children().length < 2){
            $(".js-carrito").prepend(`
            <div class="c-cabecera__notificacion js-cabecera-notificacion">
            <i class="fas fa-circle c-cabecera__notificacion-interno"></i>
            </div>`)
        }
        $(".js-cabecera-notificacion").removeClass("c-cabecera__notificacion-animacion")
        setTimeout(()=>{$(".js-cabecera-notificacion").addClass("c-cabecera__notificacion-animacion")},10)
    }
}
function carrito_Añadir(evento) {
    $(this).addClass("c-producto__carrito--en-carrito")
    carrito_AñadirArticulo($(this).parent().data('id'))
}
function carrito_ProcesarArticulo(articulo) {
    var html = `<p data-id='` + articulo.id + `' class='c-carrito__articulo'>
    <span class='c-carrito__nombre js-carrito-nombre'>`+ articulo.nombre + `</span>
    <span class='c-carrito__operador js-carrito-incremento`
    if (articulo.cantidad >= Carrito.CANTIDAD_MAXIMA) {
        html += ' c-carrito__operador--limite'
    }
    html += `'><i class="fas fa-plus"></i></span>
    <span class='c-carrito__cantidad js-carrito-cantidad`
    if (articulo.cantidad <= Carrito.CANTIDAD_MINIMA || articulo.cantidad >= Carrito.CANTIDAD_MAXIMA) {
        html += ' c-carrito__cantidad--limite'
    }
    html += `'>` + articulo.cantidad + `</span>
    <span class='c-carrito__operador js-carrito-decremento`
    if (articulo.cantidad <= Carrito.CANTIDAD_MINIMA) {
        html += ' c-carrito__operador--limite'
    }
    html += `'><i class="fas fa-minus"></i></span>
    <span class='c-carrito__basura js-carrito-basura'><i class="far fa-trash-alt"></i></span>
    </p>`
    return html
}
function carrito_QuitarArticulo(evento) {
    var producto = vista_Productos_existeEnGrid($(this).parent().data('id'))
    if (producto) {
        $(producto).children('.js-producto-carrito').removeClass('c-producto__carrito--en-carrito')
    }
    producto = GLOBAL_GESTOR_PRODUCTOS.getProductoId($(this).parent().data('id'))
    carrito.quitarArticulo(producto.id)
    carrito_Actualizar()
    generarNotificacion(producto.nombre + " eliminado del carrito.", true)
}
function carrito_IncrementarArticulo(evento) {
    var cantidadActual = carrito.incrementarCantidad($(this).parent().data('id'))
    $(this).parent().find('.js-carrito-cantidad').html(cantidadActual)
    carrito_Actualizar()
}
function carrito_DecrementarArticulo(evento) {
    var cantidadActual = carrito.decrementarCantidad($(this).parent().data('id'))
    $(this).parent().find('.js-carrito-cantidad').html(cantidadActual)
    carrito_Actualizar()
}
function carrito_ActualizarTriggers() {
    $(".js-carrito-incremento").on('click', carrito_IncrementarArticulo);
    $(".js-carrito-decremento").on('click', carrito_DecrementarArticulo);
    $(".js-carrito-basura").on('click', carrito_QuitarArticulo);
    // Reservado hasta que pueda implementarse
    //$(".js-carrito--ver-carrito").on('click', aqui ira vista carrito );
    //$(".js-carrito-pagar").on('click', aqui ira vista pagar);
}
