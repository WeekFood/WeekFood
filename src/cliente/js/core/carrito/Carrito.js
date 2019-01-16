class Carrito {
    constructor() {
        this.articulos = [];
    }

    /**
     * @param {Producto} producto 
     * 
     * @returns {Articulo|number} instancia de Articulo convertido
     * @throws si el producto proporcionado no es instancia de Producto
     */
    añadirProducto(producto) {
        if (!(producto instanceof Producto)) {
            throw new Error('Imposible añadir un producto, no es instancia de Producto');
        }

        let nuevoArticulo;

        // comprobar si el articulo ya existe en el carrito
        let articuloYaExistente = this.getArticulo(producto.id);

        if (articuloYaExistente) {
            return articuloYaExistente.incrementarCantidad();
        } else {
            nuevoArticulo = new Articulo(producto);

            this.articulos.push(nuevoArticulo);
        }

        return nuevoArticulo;
    }

    /**
     * @param {number} idArticulo 
     * 
     * @returns {Articulo} el artículo borrado
     * @throws si no se ha encontrado el artículo
     */
    quitarArticulo(idArticulo) {
        let indiceArticulo = this._indiceArticulo(idArticulo);

        if (indiceArticulo === -1) {
            throw new Error('Imposible quitar el articulo, no se ha encontrado');
        }

        return this.articulos.splice(indiceArticulo, 1)[0];
    }

    /**
     * @param {number} idArticulo
     * 
     * @returns {number|void} nueva cantidad post incremento
     * @throws si no se ha encontrado el artículo
     */
    incrementarCantidad(idArticulo) {
        let articulo = this.getArticulo(idArticulo);

        if (!articulo) {
            throw new Error('Imposible incrementar la cantidad, no se ha encontrado el artículo');
        }

        // TODO comprobar si la cantidad en los metodos y decidir que hacer
        return articulo.incrementarCantidad();
    }

    /**
    * @param {number} idArticulo
    * 
    * @returns {number} nueva cantidad post decremento
    * @throws si no se ha encontrado el artículo
    */
    decrementarCantidad(idArticulo) {
        let articulo = this.getArticulo(idArticulo);

        if (!articulo) {
            throw new Error('Imposible decrementar la cantidad, no se ha encontrado el artículo');
        }

        return articulo.decrementarCantidad();
    }

    /**
    * @param {number} idArticulo
    * @param {number} cantidad
    * 
    * @returns {number} nueva cantidad post cambio
    * @throws si no se ha encontrado el artículo
    * @throws si la cantidad es negativa
    */
    setCantidad(idArticulo, cantidad) {
        let articulo = this.getArticulo(idArticulo);

        if (!articulo) {
            throw new Error('Imposible establecer la cantidad, no se ha encontrado el artículo');
        }

        if (cantidad < 0) {
            throw new Error('Imposible establecer una cantidad negativa');
        }

        return articulo.setCantidad(cantidad);
    }

    /**
     * @returns {(Articulo[]|[])} artículos en el carrito
     */
    getArticulos() {
        return this.articulos;
    }

    /**
     * @param {number} idArticulo
     * 
     * @returns {(Articulo|undefined)} 
     */
    getArticulo(idArticulo) {
        return this.articulos.find(articulo => articulo.id === idArticulo);
    }

    /**
     * @private
     * @param {number} idArticulo 
     * 
     * @returns {number} índice del artículo buscado en el array artículos o -1 si no se ha encontrado
     */
    _indiceArticulo(idArticulo) {
        return this.articulos.findIndex(articulo => articulo.id === idArticulo);
    }
}