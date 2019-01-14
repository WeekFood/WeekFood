class CacheJSONs {
    constructor() {
        this.jsonsEnCache = [];
    }
    getJSON(url) {
        var diferido = new $.Deferred();
        var filtrados = this.jsonsEnCache.filter(this.filtrarJson.bind(this, url))
        if (filtrados.length < 1) {
            diferido = this.nuevoJson(url, diferido)
        } else {
            if ((new Date().getTime() - filtrados[0].creacion) < 25000) {
                diferido.resolve(filtrados[0].respuesta)
            } else {
                diferido = this.nuevoJson(url, diferido)
            }
        }
        return diferido.promise();
    }
    filtrarJson(actual, buscando) {
        return actual == buscando["url"]
    }
    nuevoJson(url, diferido) {
        var nuevoJsonCacheado = new JSONCacheado(url)
        $.when($.getJSON(url).then((datos)=>{
            nuevoJsonCacheado.respuesta = datos
            this.jsonsEnCache.push(nuevoJsonCacheado)
            diferido.resolve(nuevoJsonCacheado.respuesta)
        })).then(()=>{ return diferido})
       
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