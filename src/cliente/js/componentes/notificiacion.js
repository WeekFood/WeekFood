function generarNotificacion(contenido, flash = false) {

    var notificacion = "<div class='"
    if (flash) {
        notificacion += "c-notificacion c-notificacion--flash js-notificacion--flash'>"
        setTimeout(() => { $(".js-notificacion--flash").remove() }, 5010)
    }
    else {
        notificacion += "c-notificacion c-notificacion--top js-notificacion--top'>"
        $(".js-notificacion--top").remove()
        setTimeout(() => { $(".js-notificacion--top").remove() }, 10010)
    }
    notificacion += contenido + "</div>"
    $(".p-principal").prepend(notificacion)
}