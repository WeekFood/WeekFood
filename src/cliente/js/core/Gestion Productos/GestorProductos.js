class GestorProductos {
    constructor() {
        this.productos = []
        this.categoriasPrincipales = []
        GLOBAL_CACHE_JSONS.getJSON("/api/productos/categorias/").then((categoriasPrincipales) => {
            if (categoriasPrincipales !== null) {
                categoriasPrincipales.forEach(categoria => {
                    this.categoriasPrincipales.push(new Categoria(categoria.nombre))
                    this.getCategoriasEnCategoriaPrincipal(categoria.nombre)
                })
            }
        })
    }
    /**
     * 
     * @param {String} categoriaPrincipal Categoria buscando
     * @param {Categoria} actual Categoria actual en el array
     */
    filtrarCategoriaPrincipal(categoriaPrincipal, actual) {
        return actual.nombre == categoriaPrincipal
    }
    /**
     * 
     * @param {String} categoria Categoria buscando
     * @param {Producto} actual producto actual en el array
     */
    filtrarCategoria(categoria, actual) {
        return actual.categorias.indexOf(categoria) > -1
    }
    /**
     * 
     * @param {int} id Id del producto que se esta buscando
     * @param {Producto} actual producto actual en el array
     */
    filtrarId(id, actual) {
        return actual.id == id
    }
    /**
     * @param {String} categoriaPrincipal Categoria principal a buscar
     * 
     */
    getCategoriasEnCategoriaPrincipal(categoriaPrincipal) {
        var categoriaEncontrada = this.categoriasPrincipales.find(categoria => this.filtrarCategoriaPrincipal(categoriaPrincipal, categoria))
        if (categoriaEncontrada == undefined) { return undefined }
        if (categoriaEncontrada.categorias.length > 0) {
            return $.when(categoriaEncontrada.categorias[0])
        } else {
            return GLOBAL_CACHE_JSONS.getJSON("/api/productos/categorias/" + categoriaPrincipal).then((respuesta) => {
                var categoriasDescargadas = []
                respuesta.forEach(categoria => {
                    categoriasDescargadas.push(categoria.nombre)
                });
                categoriaEncontrada.categorias.push(categoriasDescargadas)
                return categoriaEncontrada
            })
        }
    }
    /**
     * 
     * @param {String} categoria Categoria a buscar
     */
    getProductosCategoria(categoriaPrincipal, categoria) {
        var productosFiltrados = this.productos.filter(producto => this.filtrarCategoria(categoria, producto))
        if (productosFiltrados.length > 0) {
            return $.when(productosFiltrados)
        } else {
            return GLOBAL_CACHE_JSONS.getJSON("/api/productos/categorias/" + categoriaPrincipal + "/" + categoria).then((respuesta) => {
                var nuevosProductos = []
                respuesta.forEach(prod => {
                    var nuevoProducto = new Producto(prod.id, prod.nombre, prod.foto, (prod.destacado == 1), prod.categoria.split(","), prod.descripcion, prod.precio)
                    this.productos.push(nuevoProducto)
                    nuevosProductos.push(nuevoProducto)
                });
                return nuevosProductos
            })
        }
    }
    /**
     * 
     * @param {int} id Id a buscar
     */
    getProductoId(id) {
        return this.productos.find(producto => this.filtrarId(id, producto))
    }

    getCategoriasPrincipales() {
        return this.categoriasPrincipales.map(cate => cate.nombre)
    }
    /**
    * 
    * @param {int} id Id del producto a generar la ventana modal.
    * @param {String} tipo tipo de la ventana a generar, defecto info
    * @param {function} callback_Confirmar callback del boton confirmar en caso de que exista, defecto funcion vacia
    * @param {function} callback_Denegar callback del boton denegar en caso de que exista, defecto funcion vacia
    */
    generarModal(id, tipo = "info", callback_Confirmar = () => { }, callback_Denegar = () => { }) {

        var producto = this.getProductoId(id)
        if (producto == undefined) { throw "El producto no existe." }
        generarVentanaModal({
            tamaño: 'medio',
            contenido: generarModalProducto(producto),
        })

        $('.js-modal-producto_añadir-carrito').on('click', function () {
            GLOBAL_CARRITO.añadirProducto(producto);

            let articulo = GLOBAL_CARRITO.getArticulo(producto.id);
            carrito_Actualizar();

            if (articulo.cantidad > 1) {
                generarNotificacion(articulo.nombre + " tienes " + articulo.cantidad + " unidades.", true);
            } else {
                generarNotificacion(articulo.nombre + " añadido al carrito.", true);
            }

            cerrarVentanaModal();
        });
    }
}