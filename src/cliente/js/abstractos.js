class CacheJSONs {
    constructor() {
        this.jsonsEnCache = [];
    }
    getJSON(url) {
        var diferido = new $.Deferred();
        var filtrados = this.jsonsEnCache.filter(buscando => this.filtrarJson(url, buscando));
        if (filtrados.length < 1) {
            $.when(this.nuevoJson(url)).then((contenido) => { diferido.resolve(contenido) });
        } else {
            if (filtrados.length > 1) {
                console.warn("/!\\Multiples (", filtrados.length, ") caches encontrados con la url", url)
            }
            if ((new Date().getTime() - filtrados[0].creacion) < 25000) {
                diferido.resolve(filtrados[0].respuesta)
            } else {
                filtrados.forEach(jsonFiltrado => this.jsonsEnCache.splice(this.jsonsEnCache.findIndex(jsonExistente => jsonExistente.url === jsonFiltrado.url), 1));
                // https://stackoverflow.com/questions/37385299/filter-and-delete-filtered-elements-in-a-array
                $.when(this.nuevoJson(url)).then((contenido) => { diferido.resolve(contenido) });
            }
        }
        return diferido.promise();
    }
    filtrarJson(actual, buscando) {
        return actual == buscando["url"]
    }
    nuevoJson(url, diferido) {
        var nuevoJsonCacheado = new JSONCacheado(url)
        return $.getJSON(url).then((datos) => {
            nuevoJsonCacheado.respuesta = datos
            this.jsonsEnCache.push(nuevoJsonCacheado)
            return nuevoJsonCacheado.respuesta
        })
    }
}
class JSONCacheado {
    constructor(url) {
        this.url = url
        this.creacion = new Date().getTime()
        this.respuesta = null
    }
}

var GLOBAL_VISTAS = {
    error: vista_Error,
    portada: vista_Portada,
    productos: vista_Productos
}
var GLOBAL_VISTA_ACTUAL = "";

var GLOBAL_CACHE_JSONS = new CacheJSONs();
var GLOBAL_NOTIFICACION_TOP = null;
var GLOBAL_NOTIFICACION_FLASH = null;
