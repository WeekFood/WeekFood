var GLOBAL_VISTAS = {
    error: vista_Error,
    portada: vista_Portada,
    productos: vista_Productos,
    ofertas: vista_Productos_Ofertas,
    perfil: vista_Perfil,
    quienesSomos: vista_QuienesSomos,
}
var GLOBAL_REDIRECCIONES = {
    productos: 'ofertas',
    ofertas: 'ofertas',
    perfil: 'perfil',
    yo: 'perfil',
}
var GLOBAL_VISTA_ACTUAL = "";
var GLOBAL_CACHE_JSONS = new CacheJSONs();
var GLOBAL_NOTIFICACION_TOP = undefined;
var GLOBAL_NOTIFICACION_FLASH = undefined;
var GLOBAL_CARRITO_EXISTE = undefined;
