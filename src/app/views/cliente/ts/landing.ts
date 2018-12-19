$('.js-boton-menu').on('click', () => {
    $('.js-menu').toggleClass('c-menu--oculto');
});

$(() => {
    $.when(cargarDatosDesde("/api/portada")).then(
        () => {
            generarCarrusel("js-carrusel")
        }
    )
})

function cargarDatosDesde(url) {
    return $.getJSON(url).then(
        (datos) => {
            $(".c-principal").html(JSON.parse(datos)["Contenido"]);
            return $.getJSON(url.replace("/api/", "/api/menu/")).then(
                (datos) => {
                    $(".js-menu").html(JSON.parse(datos)["Contenido"]);
                    return true
                }
            )
        }
    )
}