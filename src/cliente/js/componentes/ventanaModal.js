function generarVentanaModal(tamaño, titulo, contenido) {
    var tamaños = ["grande", "medio", "pequeño"]
    if (!tamaños.includes(tamaño)) {
        console.error("No se ha podido crear la ventana modal, tamaño incorrecto.")
        return false;
    }
    var modal = "<div class='c-ventana-modal js-ventana-modal'>"
    modal += "<div class='c-ventana-modal__interno c-ventana-modal__interno--" + tamaño + "'>"
    modal += "<div class='c-ventana-modal__equis js-ventana-modal__equis'></div>"
    modal += "<div class='c-ventana-modal__titulo'>" + titulo + "</div>"
    modal += "<div class='c-ventana-modal__contenido'>" + contenido + "</div>"
    modal += "</div></div>"
    $(".l-distribucion").html(modal + $(".l-distribucion").html())
}