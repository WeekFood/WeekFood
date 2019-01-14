class Carrito {
    constructor() {
        this.articulos = [];
    }

    /**
     * 
     * @param {Articulo} articulo 
     */
    añadirArticulo(articulo) {
        if (!articulo instanceof Articulo) {
            return console.error('Imposible añadir un articulo, no es instancia de Articulo');
        }

        // comprobar si el articulo ya existe en el carrito
        let articuloYaExistente = this._getArticulo(articulo.id);
        
        if (articuloYaExistente) {
            articuloYaExistente.incrementarCantidad();
        } else {
            this.articulos.push(articulo);            
        }
    }

    /**
     * 
     * @param {Articulo} idArticulo 
     */
    quitarArticulo(idArticulo) {
        let indiceArticulo = this._indiceArticulo(idArticulo);

        if (indiceArticulo === -1) {
            return console.error('Imposible quitar el articulo, no se ha encontrado');
        }

        this.articulos.splice(indiceArticulo, 1);
    }

    incrementarCantidad(idArticulo) {
        let articulo = this._getArticulo(articulo.id);

        if (!articulo) {
            return console.error('Imposible incrementar la cantidad, no se ha encontrado el artículo');
        }

        return articulo.incrementarCantidad();
    }

    decrementarCantidad(idArticulo) {
        let articulo = this._getArticulo(articulo.id);

        if (!articulo) {
            return console.error('Imposible decrementar la cantidad, no se ha encontrado el artículo');
        }

        if (articulo.decrementarCantidad() === 0) {
            // el articulo ha pasado a tener cantidad 0 -> eliminarlo? o no seria responsabilidad de Carrito ??
        };
    }

    /**
     * @private
     * @param {number} idArticulo 
     */
    _getArticulo(idArticulo) {
        return this.articulos.find(articulo => articulo.id === idArticulo);
    }

    /**
     * @private
     * @param {number} idArticulo 
     */
    _indiceArticulo(idArticulo) {
        return this.articulos.find(articulo => articulo.id === idArticulo);
    }
}