class Carrito {
    constructor() {
        this.articulos = [];
    }

    /**
     * 
     * @param {Producto} producto 
     * @returns {Articulo} instancia de Articulo convertido
     */
    añadirProducto(producto) {
        if (!producto instanceof Producto) {
            return console.error('Imposible añadir un producto, no es instancia de Producto');
        }

        let articulo = new Articulo(producto);

        // comprobar si el articulo ya existe en el carrito
        let articuloYaExistente = this.getArticulo(articulo.id);

        if (articuloYaExistente) {
            articuloYaExistente.incrementarCantidad();
        } else {
            this.articulos.push(articulo);
        }

        return articulo;
    }

    /**
     * 
     * @param {number} idArticulo 
     * @returns {}
     */
    quitarArticulo(idArticulo) {
        let indiceArticulo = this._indiceArticulo(idArticulo);

        if (indiceArticulo === -1) {
            return console.error('Imposible quitar el articulo, no se ha encontrado');
        }

        // TODO ver que devuleve
        return this.articulos.splice(indiceArticulo, 1);
    }

    /**
     *
     * @param {number} idArticulo
     */
    incrementarCantidad(idArticulo) {
        let articulo = this.getArticulo(idArticulo);

        if (!articulo) {
            return console.error('Imposible incrementar la cantidad, no se ha encontrado el artículo');
        }

        return articulo.incrementarCantidad();
    }

    /**
    *
    * @param {number} idArticulo
    */
    decrementarCantidad(idArticulo) {
        let articulo = this.getArticulo(idArticulo);

        if (!articulo) {
            return console.error('Imposible decrementar la cantidad, no se ha encontrado el artículo');
        }

        return articulo.decrementarCantidad();
    }

    /**
    *
    * @param {number} idArticulo
    */
    setCantidad(idArticulo, cantidad) {
        let articulo = this.getArticulo(idArticulo);

        if (!articulo) {
            return console.error('Imposible establecer la cantidad, no se ha encontrado el artículo');
        }

        if (cantidad < 0) {
            return console.error('Imposible establecer una cantidad negativa');
        }

        return articulo.setCantidad(cantidad);
    }

    /**
     * @returns {Articulo[]} 
     */
    getArticulos() {
        return this.articulos;
    }

    /**
     * @param {number} idArticulo
     * @returns {Articulo} 
     */
    getArticulo(idArticulo) {
        return this.articulos.find(articulo => articulo.id === idArticulo);
    }

    /**
     * @private
     * @param {number} idArticulo 
     */
    _indiceArticulo(idArticulo) {
        return this.articulos.findIndex(articulo => articulo.id === idArticulo);
    }
}