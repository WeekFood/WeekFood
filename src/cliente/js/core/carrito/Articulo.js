class Articulo extends Producto {
    /**
     * @param {Producto} producto
     */
    constructor(producto, cantidad = 1) {
        super(
            producto.id,
            producto.nombre,
            producto.foto,
            producto.destacado
        );

        this.cantidad = cantidad;
    }

    incrementarCantidad() {
        this.cantidad++;

        return this.cantidad;
    }

    decrementarCantidad() {
        this.cantidad--;
        
        return this.cantidad;
    }
}