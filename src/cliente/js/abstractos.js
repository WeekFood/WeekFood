class CacheJSONs {
    constructor() {
        this.jsonsEnCache = [];
    }
    getJSON(url) {
        var diferido = new $.Deferred();
        console.log("buscando",url)
        var filtrados = this.jsonsEnCache.filter(this.filtrarJson.bind(this, url))
        console.log("Existen",filtrados.length,"con url",url)
        if (filtrados.length < 1) {
            console.log("se va a crear uno nuevo")
            diferido = this.nuevoJson(url, diferido)
        } else {
            console.log("no se va a crear uno nuevo")
            if ((new Date().getTime() - filtrados[0].creacion) < 25000) {
                console.log("hace menos de 25s")
                diferido.resolve(filtrados[0].respuesta)
            } else {
                console.log("hace mas de 25s")
                diferido = this.nuevoJson(url, diferido)
            }
        }
        return diferido.promise();
    }
    filtrarJson(actual, buscando) {
        console.log(actual, buscando)
        return actual == buscando["url"]
    }
    nuevoJson(url, diferido) {
        console.log("Creando uno nuevo")
        var nuevoJsonCacheado = new JSONCacheado(url)
        nuevoJsonCacheado.respuesta = "holaQueTal"
        this.jsonsEnCache.push(nuevoJsonCacheado)
        diferido.resolve(nuevoJsonCacheado.respuesta)
        return diferido;
    }
}
class JSONCacheado {
    constructor(url) {
        this.url = url
        this.creacion = new Date().getTime()
        this.respuesta = null
    }
}

var vistas = {
    error: vista_Error,
    portada: vista_Portada,
    productos: vista_Productos
}

var GLOBAL_CACHE_JSONS = new CacheJSONs();
GLOBAL_CACHE_JSONS.getJSON("hola").then((resp) => { console.log(resp) })