function generarCarrusel(claseContenedor) {
    var contenido = "";
    var contenedor = document.getElementsByClassName(claseContenedor)[0];
    $.getJSON("/api/carrusel", (datos) => {
        if (datos["error"] == false) {

            contenido += "<div class='glide c-carrusel'>";

            contenido += "<div class='glide__track c-carrusel__contenedor' data-glide-el='track'>";

            contenido += "<ul class='glide__slides c-carrusel__contenedor'>";
            
            for (let index = 0; index < datos["data"].length; index++) {
                contenido += "<li class='glide__slide c-carrusel__imagen'>";
                contenido += "<img src='imagenes/productos/" + datos["data"][index]["foto"] + "'>";
                contenido += "</li>";
            }
            contenido += "</ul></div></div>";
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