function alternarMenu() {

    var menu = document.getElementById("js-menu__listado")
    var grid = document.getElementById("js-grid")
    for (var hijo = 0; hijo < menu.children.length; hijo++) {
        var clases = menu.children[hijo].getAttribute("class").split(" ")
        console.log(menu.children[hijo])
        for (var x = 0; x < clases.length; x++) {
            if (clases[x] == "c-menu__item") {
                clases[x] = "c-menu__item--desplegado"
            }
            else if (clases[x] == "c-menu__item--desplegado") {
                clases[x] = "c-menu__item"
            }
        }
        var claseStr = ""
        clases.forEach(clase => {
            claseStr += clase + " "
        })
        menu.children[hijo].setAttribute("class", claseStr.replace(/\s+$/, ''))
    }

    var boton = document.getElementById("js-menu__hamburgesa")
    if (boton.getAttribute("class") == "c-menu__hamburgesa") {
        boton.setAttribute("class", "c-menu__hamburgesa--oculto")
    } else {
        boton.setAttribute("class", "c-menu__hamburgesa")
    }
    boton = document.getElementById("js-menu__circulo")
    if (boton.getAttribute("class") == "c-menu__circulo") {
        boton.setAttribute("class", "c-menu__circulo--oculto")
    } else {
        boton.setAttribute("class", "c-menu__circulo")
    }
}
$(() => {
    $("#js-menu__hamburgesa").click(alternarMenu)
    $("#js-menu__circulo").click(alternarMenu)
});

// Si no funciona JQUERY ejecutar
//npm install --save-dev @types/jquery