$('.js-boton-menu').on('click', () => {
    $('.js-menu').toggleClass('c-menu--oculto');
});

$(() => { cargarDatosDesde("/api/portada");  generarCarrusel("js-carrusel") })


function cargarDatosDesde(url) {
    $.getJSON(url, (datos) => {
        $(".c-principal").html(JSON.parse(datos)["Contenido"]);
    })
    $.getJSON(url.replace("/api/","/api/menu/"),(datos)=>{
        $(".js-menu").html(JSON.parse(datos)["Contenido"]);
    })
}