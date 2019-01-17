class Categoria {
    /**
     * 
     * @param {String} nombre Nombre de la categoriaPrincipal
     */
    constructor(nombre) {
        this.nombre = nombre
        this.categorias = []
    }
    /**
     * 
     * @param {Array} categorias Array de categorias que se incluyen en esta categoria.} categorias 
     */
    añadirCategoria(categoria) {
        this.categorias.push(categoria)
    }
}