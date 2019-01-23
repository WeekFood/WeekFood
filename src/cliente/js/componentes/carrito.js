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
    if (GLOBAL_CARRITO.getArticulos().length < 1) {
        html = "<p class='c-carrito__vacio'><i class='far fa-sad-cry fa-3x'></i><br><br>Tu carrito está vacio</p>"
    } else {
        GLOBAL_CARRITO.getArticulos().slice(Math.max(GLOBAL_CARRITO.getArticulos().length - 5, 0)).forEach((articulo) => { html += carrito_ProcesarArticulo(articulo) })
        html += `
            <p class='c-carrito__articulo c-carrito__botones'>
            <span class='c-boton c-boton--basico js-carrito-ver-carrito'>(`+ GLOBAL_CARRITO.getArticulos().length + `) Ver mi carrito </span>
            <span class='c-boton c-boton--exito c-carrito__boton js-carrito-pagar'>`+precioEnEuros(GLOBAL_CARRITO.getImporteTotal()) + `</span>
            </p>
            `
    }
    $(".c-carrito").html(html)
    carrito_ActualizarTriggers()
}
function carrito_AñadirArticulo(id) {
    var producto = GLOBAL_GESTOR_PRODUCTOS.getProductoId(id)
    GLOBAL_CARRITO.añadirProducto(producto)
    $(`.c-producto[data-id=${id}] .c-producto__carrito`).addClass("c-producto__carrito--en-carrito");
    carrito_Actualizar()
    producto = GLOBAL_CARRITO.getArticulo(producto.id)
    if (producto.cantidad > 1) {
        generarNotificacion("Tienes " + producto.cantidad + " raciones de " + producto.nombre + " en el carrito", true)
    } else {
        generarNotificacion("Has añadido " + producto.nombre + " al carrito", true)
    }
    if ((GLOBAL_CARRITO.getArticulos().length == 1 && GLOBAL_CARRITO.getArticulos()[0].cantidad == 1) && ($(".c-carrito").length < 1 || $(".c-carrito").hasClass("c-carrito--desaparecer"))){
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
    carrito_Guardar()
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
    GLOBAL_CARRITO.quitarArticulo(producto.id)
    carrito_Actualizar()
    generarNotificacion("Has eliminado " + producto.nombre + " del carrito", true)
    carrito_Guardar()
}
function carrito_IncrementarArticulo(evento) {
    var cantidadActual = GLOBAL_CARRITO.incrementarCantidad($(this).parent().data('id'))
    $(this).parent().find('.js-carrito-cantidad').html(cantidadActual)
    carrito_Actualizar()
    carrito_Guardar()
}
function carrito_DecrementarArticulo(evento) {
    var cantidadActual = GLOBAL_CARRITO.decrementarCantidad($(this).parent().data('id'))
    $(this).parent().find('.js-carrito-cantidad').html(cantidadActual)
    carrito_Actualizar()
    carrito_Guardar()
}
function carrito_ActualizarTriggers() {
    $(".js-carrito-incremento").on('click', carrito_IncrementarArticulo);
    $(".js-carrito-decremento").on('click', carrito_DecrementarArticulo);
    $(".js-carrito-basura").on('click', carrito_QuitarArticulo);
    // Reservado hasta que pueda implementarse
    //$(".js-carrito--ver-carrito").on('click', aqui ira vista carrito );
    //$(".js-carrito-pagar").on('click', aqui ira vista pagar);
}
function carrito_Guardar(){
    /*
        TODO:
        Solo debe hacerse POST si no existe un carrito en el servidor, en caso contrario se usa PUT para actualizar el contenido
    */
    $.post({
        url: '/api/carritos',
        contentType: 'application/json',
        data: GLOBAL_CARRITO.exportar()
    }).catch(() => generarNotificacion('<i class="far fa-frown"></i> No se ha podido guardar tu carrito'));
}
function carrito_Descargar() {
    // Esto descargara el carrito de la API
    // Esto es practicamente pseudocodigo
    $.getJSON('/api/carritos').then((respuesta) => {
        if (respuesta.length == undefined) {
            GLOBAL_CARRITO_EXISTE = true
            respuesta.articulos.forEach(articulo => {
                GLOBAL_GESTOR_PRODUCTOS.descargarProductoId(articulo.id).then(()=>{
                    GLOBAL_CARRITO.añadirProducto(GLOBAL_GESTOR_PRODUCTOS.getProductoId(articulo.id))
                    GLOBAL_CARRITO.setCantidad(articulo.id, articulo.cantidad)
                })}
            )
        } else {
            GLOBAL_CARRITO_EXISTE = false
        }
    })
}