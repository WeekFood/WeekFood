function generarNotificacion(contenido, flash = false) {
    var notificacion = "<div class='"
    if (flash) {
        notificacion += "c-notificacion c-notificacion--flash js-notificacion--flash'>"
        notificacion += "<div class='c-notificacion__barra-tiempo c-notificacion__barra-tiempo--flash'></div>"
        $(".js-notificacion--flash").remove()
        clearTimeout(GLOBAL_NOTIFICACION_TOP)
        GLOBAL_NOTIFICACION_TOP = setTimeout(() => { $(".js-notificacion--flash").remove() }, 5010)
    }
    else {
        notificacion += "c-notificacion c-notificacion--top js-notificacion--top'>"
        notificacion += "<div class='c-notificacion__barra-tiempo c-notificacion__barra-tiempo--top'></div>"
        $(".js-notificacion--top").remove()
        clearTimeout(GLOBAL_NOTIFICACION_FLASH)
        GLOBAL_NOTIFICACION_FLASH = setTimeout(() => { $(".js-notificacion--top").remove() }, 10010)
    }
    notificacion += contenido + "</div>"
    $(".p-principal").prepend(notificacion)
    $(".js-notificacion--top").on('click', () => { $(".js-notificacion--top").remove() })
    $(".js-notificacion--flash").on('click', () => { $(".js-notificacion--flash").remove() })

}