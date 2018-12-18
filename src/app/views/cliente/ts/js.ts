$(() => { cargarDatosDesde("/api/portada") })

function cargarDatosDesde(url) {
    $.getJSON(url, (datos) => {
        datos = JSON.parse(datos);
        $.each(datos["Datos"], (indice, objeto) => {
            var Nobj = construyeElemento(objeto)
            $(".c-distribucion__cuerpo").append(Nobj);
        })
    })
}
function construyeElemento(objeto) {
    var nuevoObj = $(objeto["Tipo"]);
    $.each(objeto["Atributos"], (indice, atributo) => {
        $(nuevoObj).attr(atributo["Tipo"], atributo["valor"])
    })
    $.each(objeto["Hijos"], (indice,hijo)=>{
        if (hijo["Tipo"] != "#text"){
            var Nobj = construyeElemento(hijo);
            nuevoObj.append(Nobj);
        }else{
            $(nuevoObj).html(
                $(nuevoObj).html() + hijo["valor"]
            )
        }
    })
    return nuevoObj
}