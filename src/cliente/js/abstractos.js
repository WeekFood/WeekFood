var GLOBAL_VISTAS = {
    error: vista_Error,
    portada: vista_Portada,
    productos: vista_Productos,
    quienesSomos: vista_QuienesSomos,
    ofertas: vista_Productos_Ofertas
}
var GLOBAL_REDIRECCIONES = {
    productos:'ofertas',
    ofertas:'ofertas',
}
var GLOBAL_VISTA_ACTUAL = "";
var GLOBAL_CACHE_JSONS = new CacheJSONs();
var GLOBAL_NOTIFICACION_TOP = null;
var GLOBAL_NOTIFICACION_FLASH = null;
var GLOBAL_CARRITO_EXISTE = undefined;