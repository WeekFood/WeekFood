function generarCarrusel(puntoMontaje) {
    let html = "";

    $.getJSON("/api/carrusel", (datos) => {
        if (datos["error"] == false) {
            let imagenes = datos.data;

            html += `<div class="c-carrusel">`;

            imagenes.forEach(imagen => {
                html += `<img class="c-carrusel__imagen" src="imagenes/productos/${imagen.foto}">`;
            });

            html += `</div>`;

            $(puntoMontaje).html(html);

            $('.c-carrusel').slick({
                infinite: true,
                slidesToShow: 3,
                autoplay: true,
                autoplaySpeed: 0,
                speed: 2500,
                cssEase: 'linear',
                arrows: false,
                swipe: false,
                touchMove: false,
                pauseOnHover: false,
                pauseOnFocus: false
            });
        }
    })
}