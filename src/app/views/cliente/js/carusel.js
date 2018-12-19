
function generarCarrusel(claseContenedor) {
    var contenido = "";
    var contenedor = document.getElementsByClassName(claseContenedor)[0];
    $.getJSON("/api/carrusel", (datos) => {
        if (datos["error"] == false) {
            contenido += "<div class='glide'>";

            contenido += "<div class='glide__track' data-glide-el='track'>";

            contenido += "<div class='glide__slides'>";
            
            for (let index = 0; index < datos["data"].length; index++) {
                contenido += "<img class='glide__slide' src='imagenes/productos/" + datos["data"][index]["foto"] + "'>";
            }
            contenido += "</div></div></div>";
            contenedor.innerHTML = contenido;
            new Glide('.glide', {
                type: 'carousel',
                autoplay: 1,
                animationDuration: 5000,
                hoverpause: false,
                perView: 3,
                gap: 0,
                animationTimingFunc: 'linear'
            }).mount()
        }
    })
}