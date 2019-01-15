class Carrito {
    constructor() {
        this.articulos = [];
    }

    /**
     * 
     * @param {Producto} producto 
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

        return articulo.id;
    }

    /**
     * 
     * @param {number} idArticulo 
     */
    quitarArticulo(idArticulo) {
        let indiceArticulo = this._indiceArticulo(idArticulo);

        if (indiceArticulo === -1) {
            return console.error('Imposible quitar el articulo, no se ha encontrado');
        }

        this.articulos.splice(indiceArticulo, 1);
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

        if (articulo.decrementarCantidad() === 0) {
            // el articulo ha pasado a tener cantidad 0 -> eliminarlo? o no seria responsabilidad de Carrito ??
        };
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

    if (cantidad === 0) {
        // el articulo ha pasado a tener cantidad 0 -> eliminarlo? o no seria responsabilidad de Carrito ??
    }

    articulo.cantidad = cantidad;
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