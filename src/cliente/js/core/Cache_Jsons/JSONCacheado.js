class JSONCacheado {
    constructor(url) {
        this.url = url
        this.creacion = new Date().getTime()
        this.respuesta = null
    }
}