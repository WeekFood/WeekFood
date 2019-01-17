/**
 * 
 * @param {Producto} producto Producto sobre el que se generará el html de la ventana modal
 */
function generarVisualizacionProducto(producto) {
    var html = `
        <div>
        <div>
        <img src='/imagenes/productos/`+ producto.foto + `'>
        </div>
        <div>
        <p>`+ producto.descripcion + `</p>
        <div>`
    producto.categorias.forEach(categoria => {
        html += `<span>` + categoria + `</span>`
    })
    html += `</div>
        </div>
        </div>
        `
    return html
}