function generarCarrusel(claseContenedor) {
    var contenido;
    $.getJSON("/api/carrusel", (datos) => {
        if (datos["error"] == false) {
            var imagenes = datos["data"];//aqui el json de imagenes
            contenido += "<div class='glide'>";

            contenido += "<div class='glide__track data-glide-el='track'";

            contenido += "<ul class='glide__slides '>";
            //Creo el bucle y se van añadiendo las imagenes
            for (let index = 0; index < datos["data"].length; index++) {
                contenido += "<li class='glide__slide'><img src='imagenes/productos/" + datos["data"][index]["foto"] + "</img></li>";
            }
            claseContenedor.innerHTML = contenido;
        }
    })
}