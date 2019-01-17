/**
* 
* @param {Int} id Id del producto a generar la ventana modal.
* @param {String} tipo tipo de la ventana a generar, defecto info
* @param {function} callback_Confirmar callback del boton confirmar en caso de que exista, defecto funcion vacia
* @param {function} callback_Denegar callback del boton denegar en caso de que exista, defecto funcion vacia
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