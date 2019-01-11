function generarNotificacion(contenido, flash = false) {
    $(".js-notificacion--flash").remove()
    var notificacion = "<div class='"
    if (flash) { notificacion += "c-notificacion--flash js-notificacion--flash'>" }
    else { notificacion += "c-notificacion js-notificacion'>"}
    notificacion += contenido+"</div>"
    $(".p-principal").prepend(notificacion)
    setTimeout(()=>{$(".js-notificacion--flash").remove()},5010)
}