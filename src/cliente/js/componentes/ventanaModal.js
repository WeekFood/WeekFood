function generarVentanaModal(tamaño, titulo, contenido) {
    var tamaños = ["grande", "medio", "pequeño"]
    if (!tamaños.includes(tamaño)){
        console.error("No se ha podido crear la ventana modal, tamaño incorrecto.")
        return false;
    }
    var modal = "<div class='c-ventana-modal js-ventana-modal'><div class='c-ventana-modal__contenido c-ventana-modal__contenido--"+tamaño
    modal += "'><div class='c-ventana-modal__titulo'>"+titulo+"</div>"
    modal += contenido + "</div></div>"
    $(".l-distribucion").html(modal + $(".l-distribucion").html())
}