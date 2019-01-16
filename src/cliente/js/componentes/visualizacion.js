/**
* 
* @param {Int} id Id del producto a generar la ventana modal.
* @param {String} tipo tipo de la ventana a generar, defecto info
* @param {function} callback_Confirmar callback del boton confirmar en caso de que exista, defecto funcion vacia
* @param {function} callback_Denegar callback del boton denegar en caso de que exista, defecto funcion vacia
*/
function generarVisualizacionProducto(id, tipo = "info", callback_Confirmar = () => { }, callback_Denegar = () => { }) {
    var producto = GLOBAL_GESTOR_PRODUCTOS.getProductoId(id)
    if (producto == undefined) { throw "El producto no existe." }
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
    generarVentanaModal({
        tamaño: "grande",
        tipo: "confirmacion",
        titulo: producto.nombre,
        contenido: html,
        callback_Confirmar: callback_Confirmar,
        callback_Denegar: callback_Denegar
    })
}       
