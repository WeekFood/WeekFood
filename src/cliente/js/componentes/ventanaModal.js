function generarVentanaModal(opciones) {//contenido, titulo = false, tamaño = "medio", tipo = "info", callback_Confirmar = false, callback_Denegar = false) {
    var tamaños = ["grande", "medio", "pequeño"]
    var tipos = ["info", "aviso", "confirmacion", "error"]

    if (!opciones.hasOwnProperty("contenido")) {
        opciones["contenido"] = "";
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
    var modal = "<div class='c-ventana-modal js-ventana-modal'>"

    switch (opciones.tipo) {
        case "aviso":
            if (!opciones.hasOwnProperty("callback_Confirmar")) {
                console.error("No se ha podido crear la ventana modal, no existe un retorno (callback_Confirmar).")
                alert("No se ha podido generar la ventana emergente.")
                return false;
            }
            modal += `<div class='c-ventana-modal__botones'>
            <button class='c-ventana-modal__boton c-ventana-modal__boton--aviso js-ventana-modal__confirmar>Ok</button>
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
            <button class='c-ventana-modal__boton c-ventana-modal__boton--confirmar js-ventana-modal__confirmar>Aceptar</button>
            <button class='c-ventana-modal__boton c-ventana-modal__boton--cancelar js-ventana-modal__denegar>Cancelar</button>
            </div>`
            break
        case "error":
            modal += `<div class='c-ventana-modal__botones'>
            <button class='c-ventana-modal__boton c-ventana-modal__boton--error js-ventana-modal__cerrar>Pue vale.</button>
            </div>`
            break
        default: //info
            modal += "<div class='c-ventana-modal__equis js-ventana-modal__cerrar'></div>"
    }

    modal += "<div class='c-ventana-modal__interno c-ventana-modal__interno--" + opciones.tamaño + "'>"

    if (opciones.hasOwnProperty("titulo")) {
        modal += "<div class='c-ventana-modal__titulo'>" + opciones.titulo + "</div>"
    }

    modal += "<div class='c-ventana-modal__contenido'>" + opciones.contenido + "</div>"
    modal += "</div></div>"
    $(".l-distribucion").html(modal + $(".l-distribucion").html())
    $('.js-ventana-modal__cerrar').on('click', cerrarVentanaModal);
    $('.js-ventana-modal__confirmar').on('click', () => { cerrarVentanaModal(), callback_Confirmar() });
    $('.js-ventana-modal__denegar').on('click', () => { cerrarVentanaModal(), callback_Denegar() });
}
function cerrarVentanaModal() {
    $(".js-ventana-modal").remove()
}