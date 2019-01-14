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
        return ++this.cantidad;
    }

    decrementarCantidad() {
        return --this.cantidad;
    }
}