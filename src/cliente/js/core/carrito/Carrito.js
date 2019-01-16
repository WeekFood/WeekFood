class Carrito {
    constructor() {
        this.articulos = [];
    }

    /**
     * @param {Producto} producto 
     * 
     * @returns {Articulo|number|void} instancia de Articulo convertido
     */
    añadirProducto(producto) {
        if (!(producto instanceof Producto)) {
            return console.error('Imposible añadir un producto, no es instancia de Producto');
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
     * @returns {Articulo|void} el artículo borrado
     */
    quitarArticulo(idArticulo) {
        let indiceArticulo = this._indiceArticulo(idArticulo);

        if (indiceArticulo === -1) {
            return console.error('Imposible quitar el articulo, no se ha encontrado');
        }

        return this.articulos.splice(indiceArticulo, 1)[0];
    }

    /**
     * @param {number} idArticulo
     * 
     * @returns {number|void} nueva cantidad post incremento
     */
    incrementarCantidad(idArticulo) {
        let articulo = this.getArticulo(idArticulo);

        if (!articulo) {
            return console.error('Imposible incrementar la cantidad, no se ha encontrado el artículo');
        }

        return articulo.incrementarCantidad();
    }

    /**
    * @param {number} idArticulo
    * 
    * @returns {number|void} nueva cantidad post decremento
    */
    decrementarCantidad(idArticulo) {
        let articulo = this.getArticulo(idArticulo);

        if (!articulo) {
            return console.error('Imposible decrementar la cantidad, no se ha encontrado el artículo');
        }

        return articulo.decrementarCantidad();
    }

    /**
    * @param {number} idArticulo
    * @param {number} cantidad
    * 
    * @returns {number|void} nueva cantidad post cambio
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
     * @returns {Articulo[]} artículos en el carrito
     */
    getArticulos() {
        return this.articulos;
    }

    /**
     * @param {number} idArticulo
     * 
     * @returns {Articulo} 
     */
    getArticulo(idArticulo) {
        return this.articulos.find(articulo => articulo.id === idArticulo);
    }

    /**
     * @private
     * @param {number} idArticulo 
     * 
     * @returns {number} índice del artículo buscado en el array artículos
     */
    _indiceArticulo(idArticulo) {
        return this.articulos.findIndex(articulo => articulo.id === idArticulo);
    }
}