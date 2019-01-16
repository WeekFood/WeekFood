class Articulo extends Producto {
    /**
     * @param {Producto} producto
     * @param {number} [cantidad]
     */
    constructor(producto, cantidad = 1) {
        super(
            producto.id,
            producto.nombre,
            producto.foto,
            producto.destacado,
            producto.categorias
        );

        this.cantidad = cantidad;
    }

    /**
     * @returns {number} nueva cantidad post incremento
     */
    incrementarCantidad() {
        this.cantidad++;

        return this.cantidad;
    }

    /**
     * @returns {number} nueva cantidad post decremento
     */
    decrementarCantidad() {
        this.cantidad--;
        
        return this.cantidad;
    }

    /**
     * @param {number} cantidad 
     * @returns {number} nueva cantidad post cambio
     */
    setCantidad(cantidad) {
        this.cantidad = cantidad;

        return this.cantidad;
    }
}