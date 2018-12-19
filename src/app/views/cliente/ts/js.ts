$(() => { cargarDatosDesde("/api/portada") })


function cargarDatosDesde(url) {
    $.getJSON(url, (datos) => {
        $(".c-distribucion__cuerpo").html(JSON.parse(datos)["Contenido"]);
    })
}
