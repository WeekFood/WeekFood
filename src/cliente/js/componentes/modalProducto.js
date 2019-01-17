/** 
 * @param {Producto} producto Producto sobre el que se generará el html de la ventana modal
 * 
 * @returns {string} HTML
 */
function generarModalProducto(producto) {
    let html = `
        <div class="c-modal-producto">
            <img class="c-modal-producto__imagen" src="/imagenes/productos/${producto.foto}">
            <div class="c-modal-producto__contenido">
                <div class="c-modal-producto__nombre">${producto.nombre}</div>
                <div class="c-modal-producto__descripcion">${producto.descripcion}</div>
                <div class="c-modal-producto__comprar">
                    <div class="c-modal-producto__precio">${producto.precio / 100 /* TODO: cambiar post merge 170 */}€</div>
                    <div class="c-modal-producto__boton">
                        <div class="c-boton c-boton--exito js-modal-producto_añadir-carrito">Añadir al carrito</div>
                    </div>
                </div>
                <div class="c-modal-producto__categorias">
    `;
                    producto.categorias.forEach(categoria => html += `<div class="c-modal-producto__categoria c-etiqueta">${categoria}</div>`);

    html += `
                </div>
            </div>
        </div>
    `
    return html;
}