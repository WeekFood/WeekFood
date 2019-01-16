class GestorProductos {
    constructor() {
        this.productos = []
        this.categoriasPrincipales = []
        this.bloqueado = true
        GLOBAL_CACHE_JSONS.getJSON("/api/productos/categorias/").then((categoriasPrincipales) => {
            if (categoriasPrincipales !== null) {
                categoriasPrincipales.forEach(categoria => {
                    this.categoriasPrincipales.push(new Categoria(categoria.nombre))
                    this.getCategoriasEnCategoriaPrincipal(categoria.nombre)
                })
            }
            this.bloqueado = false
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
     * @param {String} producto Categoria buscando
     * @param {Producto} actual Categoria actual en el array
     */
    filtrarCategoria(producto, actual) {
        return actual.categorias.indexOf(producto) > -1
    }
    /**
     * 
     * @param {String} categoria Id buscando
     * @param {Producto} producto Categoria actual en el array
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
            return $.when(categoriaEncontrada.categorias)
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
                    var nuevoProducto = new Producto(prod.id, prod.categoria.split(","), prod.nombre, prod.descripcion, prod.foto, (prod.destacado == 1))
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
        if (this.bloqueado) {
            throw "El gestor esta inicializandose";
        }
        return this.categoriasPrincipales.map(cate => cate.nombre)
    }
    /**
     * 
     * @param {Int} id Id del producto a generar la ventana modal.
     */
    generarVentanaModalId(id, tipo = "info", callback_Confirmar = ()=>{}, callback_Denegar= ()=>{}){
        var producto = this.getProductoId(id)
        if (producto == undefined) {throw "El producto no existe."}
        var html = `
        <div>
        <div>
        <img src='/imagenes/productos/`+producto.foto+`'>
        </div>
        <div>
        <p>`+producto.descripcion+`</p>
        <div>`
        producto.categorias.forEach(categoria=>{
            html +=`<span>`+categoria+`</span>`
        })
        html += `</div>
        </div>
        </div>
        `
        generarVentanaModal({
            tamaño : "grande",
            tipo : "confirmacion",
            titulo : producto.nombre,
            contenido : html,
            callback_Confirmar : callback_Confirmar,
            callback_Denegar : callback_Denegar
        })
    }
} 