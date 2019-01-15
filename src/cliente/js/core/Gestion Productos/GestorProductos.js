class GestorProductos {
    constructor() {
        this.productos = []
        this.categoriasPrincipales = []
        this.bloqueado = true
        GLOBAL_CACHE_JSONS.getJSON("/api/productos/categorias/").then((categoriasPrincipales) => {
            if (categoriasPrincipales !== null) {
                categoriasPrincipales.forEach(categoria => {
                    this.categoriasPrincipales.push(new Categoria(categoria.nombre))
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
        console.log(actual);

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
        if (this.bloqueado) {
            throw "El gestor esta inicializandose";
        }
        var productosFiltrados = this.categoriasPrincipales.filter(categoria => this.filtrarCategoriaPrincipal(categoriaPrincipal, categoria))
        if (productosFiltrados.length > 0) {
            return $.when(productosFiltrados)
        } else {
            return GLOBAL_CACHE_JSONS.getJSON("/api/productos/categorias/" + categoriaPrincipal).then((respuesta) => {
                if (respuesta !== null) {
                    var nuevaCategoriaPrincipal = new Categoria(categoriaPrincipal)
                    respuesta.forEach(categoria => {
                        nuevaCategoriaPrincipal.añadirCategoria(categoria.nombre)
                    });
                    this.categoriasPrincipales.push(nuevaCategoriaPrincipal)
                    return nuevaCategoriaPrincipal
                } else {
                    return null
                }
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
                if (respuesta !== null) {
                    var nuevosProductos = []
                    respuesta.forEach(prod => {
                        var nuevoProducto = new Producto(prod.id, prod.categoria.split(","), prod.nombre, prod.descripcion, prod.foto, (prod.destacado == 1))
                        this.productos.push(nuevoProducto)
                        nuevosProductos.push(nuevoProducto)
                    });
                    return nuevosProductos
                } else {
                    return null
                }
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
} 