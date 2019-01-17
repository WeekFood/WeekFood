class Producto {
    /**
     * @param {number} id 
     * @param {string} nombre 
     * @param {string} foto 
     * @param {boolean} destacado
     * @param {Array} categorias no BD - construido por el gestor de productos
     */
    constructor(id, nombre, foto, destacado, categorias) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.destacado = destacado;
        this.categorias = categorias;
    }
}