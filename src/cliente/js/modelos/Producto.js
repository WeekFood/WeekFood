class Producto{
    /**
     * 
     * @param {int} id Id del producto, proveniente de la API.
     * @param {string} nombre Nombre del producto, proveniente de la API.
     * @param {string} foto Foto del producto, proveniente de la API.
     * @param {String} destacado Categoria principal a buscar, requiere llamada a la API.
     * @param {array} categorias Categorias del producto, proveniente de la API.
     * @param {string} descripcion Descripcion del producto, proveniente de la API
     * @param {int} precio Precio del producto, proveniente de la API
     */
    constructor(id,nombre,foto,destacado,categorias,descripcion,precio){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.destacado = destacado
        this.categorias = categorias
        this.descripcion = descripcion
        this.precio = precio
    }
} 