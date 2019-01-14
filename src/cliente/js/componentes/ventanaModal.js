function generarVentanaModal(opciones) {
    var tamaños = ["grande", "medio", "pequeño"]
    var tipos = ["info", "aviso", "confirmacion", "error"]
    /*
    equis = true / false
    contenido = string
    titulo = string
    callback_Cerrar = function
    callback_Confirmar = function
    callback_Denegar = function
    */

    if (!opciones.hasOwnProperty("contenido")) {
        opciones["contenido"] = "";
    }
    if (!opciones.hasOwnProperty("callback_Cerrar")) {
        opciones["callback_Cerrar"] = () => { };
    }
    if (opciones.hasOwnProperty("tamaño")) {
        if (!tamaños.includes(opciones.tamaño)) {
            console.error("No se ha podido crear la ventana modal, tamaño incorrecto.")
            alert("No se ha podido generar la ventana emergente.")
            return false;
        }
    } else {
        opciones["tamaño"] = "medio";
    }
    if (opciones.hasOwnProperty("tipo")) {
        if (!tipos.includes(opciones.tipo)) {
            console.error("No se ha podido crear la ventana modal, tipo incorrecto.")
            alert("No se ha podido generar la ventana emergente.")
            return false;
        }
    } else {
        opciones["tipo"] = "info";
    }
    var modal = "<div class='c-ventana-modal js-ventana-modal js-ventana-modal__cerrar'>"

    modal += "<div class='c-ventana-modal__interno c-ventana-modal__interno--" + opciones.tamaño + "'>"
    if (opciones.hasOwnProperty("titulo")) {
        modal += "<div class='c-ventana-modal__titulo'>" + opciones.titulo + "</div>"
    }

    modal += "<div class='c-ventana-modal__contenido'>" + opciones.contenido + "</div>"
    switch (opciones.tipo) {
        case "aviso":
            if (!opciones.hasOwnProperty("callback_Confirmar")) {
                console.error("No se ha podido crear la ventana modal, no existe un retorno (callback_Confirmar).")
                alert("No se ha podido generar la ventana emergente.")
                return false;
            }
            modal += `<div class='c-ventana-modal__botones'>
            <div class='c-boton c-boton--advertencia js-ventana-modal__confirmar'>Ok</div>
            </div>`
            break
        case "confirmacion":
            if (!opciones.hasOwnProperty("callback_Confirmar")) {
                console.error("No se ha podido crear la ventana modal, no existe un retorno (callback_Confirmar).")
                alert("No se ha podido generar la ventana emergente.")
                return false;
            }
            if (!opciones.hasOwnProperty("callback_Denegar")) {
                console.error("No se ha podido crear la ventana modal, no existe un retorno (callback_Denegar).")
                alert("No se ha podido generar la ventana emergente.")
                return false;
            }
            modal += `<div class='c-ventana-modal__botones'>
            <div class='c-boton c-boton--exito js-ventana-modal__confirmar'>Aceptar</div>
            <div class='c-boton c-boton--peligro js-ventana-modal__denegar'>Cancelar</div>
            </div>`
            break
        case "error":
            modal += `<div class='c-ventana-modal__botones'>
            <div class='c-boton c-boton--peligro js-ventana-modal__cerrar'>Okey</div>
            </div>`
            break
        default: //info
            if (!opciones.hasOwnProperty("equis")) {
                opciones["equis"] = true;
            }
    }

    if (opciones.equis) {
        modal += "<div class='c-ventana-modal__equis js-ventana-modal__cerrar'></div>"
    }

    modal += "</div></div>"
    cerrarVentanaModal()
    $(".p-principal").prepend(modal)
    $('.c-ventana-modal__contenido').on('click',(click)=>click.stopPropagation())
    $('.js-ventana-modal__cerrar').on('click', () => { cerrarVentanaModal(); opciones.callback_Cerrar() });
    $('.js-ventana-modal__confirmar').on('click', () => { cerrarVentanaModal(); opciones.callback_Confirmar() });
    $('.js-ventana-modal__denegar').on('click', () => { cerrarVentanaModal(); opciones.callback_Denegar() });

}
function cerrarVentanaModal() {
    $(".js-ventana-modal").remove()
}