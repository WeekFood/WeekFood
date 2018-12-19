$(() => { cargarDatosDesde("/api/portada") })


function cargarDatosDesde(url) {
    $.getJSON(url, (datos) => {
        $(".c-principal").html(JSON.parse(datos)["Contenido"]);
    })
console.log(url.replace("/api/","/api/menu/"));
    $.getJSON(url.replace("/api/","/api/menu/"),(datos)=>{
        $(".js-menu").html(JSON.parse(datos)["Contenido"]);
    })
}
