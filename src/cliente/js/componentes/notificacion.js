function generarNotificacion(contenido, flash = false) {
    var notificacion = "<div class='"
    if (flash) {
        notificacion += "c-notificacion c-notificacion--flash js-notificacion--flash'>"
        $(".js-notificacion--flash").remove()
        setTimeout(() => { $(".js-notificacion--flash").remove() }, 5010)
    }
    else {
        notificacion += "c-notificacion c-notificacion--top js-notificacion--top'>"
        $(".js-notificacion--top").remove()
        setTimeout(() => { $(".js-notificacion--top").remove() }, 10010)
    }
    notificacion += contenido + "</div>"
    $(".p-principal").prepend(notificacion)
    $(".js-notificacion--top").on('click',()=>{$(".js-notificacion--top").remove()})
    $(".js-notificacion--flash").on('click',()=>{$(".js-notificacion--flash").remove()})

}