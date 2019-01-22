function vista_QuienesSomos(puntoMontaje, idioma) {
    var contenido = {
        bandera: ["ES", "UK"], // http://www.countryflags.com iconos
        cabecera: [
            `<div class='c-quienes-somos__cabecera'>
            <p class='c-quienes-somos__titulo'>¿Quienes somos?</p>
            <p class='c-quienes-somos__titulo-menor'>Somos una empresa ficticia, para el proyecto de final de curso de Desarrollo de Aplicaciones Web.</p>
            </div>`,
            `<div class='c-quienes-somos__cabecera'>
            <p class='c-quienes-somos__titulo'>About us?</p>
            <p class='c-quienes-somos__titulo-menor'>Blah blah blah blah, allan fix this, blah blah.</p>
            </div>`
        ],
        contenido: [
            `<div class='c-quienes-somos__contenido'>
            <div class='c-quienes-somos__contenido-interno'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Vivamus venenatis lorem quis elit elementum, ut tempus lectus volutpat.</p>
            <p>Cras a sapien euismod lorem ullamcorper tincidunt quis nec dolor.</p>
            <p>Nunc sit amet imperdiet est. Vivamus sed laoreet enim.</p>
            <p>Fusce sollicitudin vitae lorem id facilisis.</p>
            <p>Donec vitae ex ante. Nullam ac ante sed eros rutrum aliquam.</p>
            </div></div>`
        ],
        equipo: [
            `<div class='c-quienes-somos__equipo'>
            <p class='c-quienes-somos__titulo-menor'>Nuestro equipo</p>
            <p><i class="far fa-smile"></i>Jefe de operaciones, YB</p>
            <p><i class="far fa-smile-wink"></i>Director ejecutivo, TD</p>
            <p><i class="far fa-smile-beam"></i>Master del universo, JL</p>
            </div>`
        ],
        attCliente: [
            `<div class='c-quienes-somos__attCliente'>
            <p class='c-quienes-somos__titulo-menor'>Atención al cliente</p>
            <p><i class="fas fa-phone"></i>902 - 123- 469</p>
            <p><i class="far fa-envelope"></i>* info@weekfood.com</p>
            <p><i class="fab fa-whatsapp"></i>* 603 - 123- 469</p>
            <p>*(Atención automatizada)</p>
            </div>`
        ],
        redes: [
            `<div class='c-quienes-somos__redes'>
            <p class='c-quienes-somos__titulo-menor'>¡Siguenos en nuestras redes sociales!</p>
            <p><i class="fab fa-instagram"></i> @WeekFood</p>
            <p><i class="fab fa-twitter"></i></i> @WeekFood</p>
            <p><i class="fab fa-facebook"></i> /WeekFood</p>
            </div>`
        ]

    }
    if (!idioma) { idioma = 0 }
    var html = `<div class='c-quienes-somos'>
    <div class='c-quienes-somos__banderas'>`
    for (var x = 0; x < contenido.bandera.length; x++) {
        html += "<div class='c-quienes-somos__contenedor-bandera"
        if (x == idioma) {
            html += " c-quienes-somos__contenedor-bandera--seleccionada"
        }
        html += `'>
                <img class='c-quienes-somos__bandera' src='/imagenes/bandera_` + cargarEnIdioma(contenido, 'bandera', x)
        html += `.png' onclick="cargarVista('quienesSomos',` + x + `)">
                </div>`
    }
    html += '</div>'
    html += cargarEnIdioma(contenido, 'cabecera', idioma)
    html += cargarEnIdioma(contenido, 'contenido', idioma)
    html += cargarEnIdioma(contenido, 'equipo', idioma)
    html += cargarEnIdioma(contenido, 'attCliente', idioma)
    html += cargarEnIdioma(contenido, 'redes', idioma)
    html += "</div>"
    $(puntoMontaje).html(html)
}