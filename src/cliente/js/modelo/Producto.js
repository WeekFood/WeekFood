class Producto{
    /**
     * 
     * @param {int} id Id del producto, proveniente de la API.
     * @param {array} categorias Categorias del producto, proveniente de la API.
     * @param {string} nombre Nombre del producto, proveniente de la API.
     * @param {string} descripcion Dewcripcion del producto, proveniente de la API.
     * @param {string} foto Foto del producto, proveniente de la API.
     * @param {String} destacado Categoria principal a buscar, requiere llamada a la API.
     */
    constructor(id,categorias,nombre,descripcion,foto,destacado){
        this.id = id
        this.categorias = categorias
        this.nombre = nombre
        this.descripcion = descripcion
        this.foto = foto
        this.destacado = destacado
    }
} 