function generarVentanaModal(contenido){
    var modal = "<div class='c-ventana-modal js-ventana-modal'><div class='c-ventana-modal__contenido'>"+contenido+"</div></div>"
    $(".l-distribucion").html(modal +  $(".l-distribucion").html())
}