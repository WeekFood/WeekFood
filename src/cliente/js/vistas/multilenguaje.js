function vista_QuienesSomos(puntoMontaje, idioma) {
    var contenido = {
        bandera: { es: "ES", en: "EN" }, // http://www.countryflags.com iconos
        cabecera: {
            es: `<div class='c-quienes-somos__cabecera'>
            <p class='c-quienes-somos__titulo'>¿Quienes somos?</p>
            <p class='c-quienes-somos__titulo-menor'>Somos una empresa ficticia, para el proyecto de final de curso de Desarrollo de Aplicaciones Web.</p>
            </div>`,
            en: `<div class='c-quienes-somos__cabecera'>
            <p class='c-quienes-somos__titulo'>About us?</p>
            <p class='c-quienes-somos__titulo-menor'>Blah blah blah blah, allan fix this, blah blah.</p>
            </div>`
        },
        contenido: {
            es: `<div class='c-quienes-somos__contenido'>
            <div class='c-quienes-somos__contenido-interno'>
            <p>Hola a todos, somos una web para gestionar encargos a casas de comidas.</p>
            <p>Nuestra idea de negocio se basa en, satisfacer la necesidad de comer comida casera</p>
            <p>sin que gasteis tiempo en cocinar y/o en planear.</p>
            <p>De este modo el cliente puede dedicar su tiempo a otras cosas.</p>
            <p class='c-quienes-somos__titulo-menor'>Plantilla de WeekFood</p>
            <div class='c-quienes-somos__equipo-interno'>
            <p>Jefe de operaciones, YB<img class='c-quienes-somos__equipo-imagen' src='/imagenes/yury.jpg'></p>
            <p>Director ejecutivo, TD<img class='c-quienes-somos__equipo-imagen' src='/imagenes/toni.jpg'></p>
            <p>Master del universo, JL<img class='c-quienes-somos__equipo-imagen' src='/imagenes/jl.jpg'></p>
            </div></div></div>`,
            //en:'Hola que tal'
        },
        /*equipo: {
            es: `<div class='c-quienes-somos__equipo'>
            <p class='c-quienes-somos__titulo-menor'>Plantilla de WeekFood</p>
            <div class='c-quienes-somos__equipo-interno'>
            <p>Jefe de operaciones, YB<img class='c-quienes-somos__equipo-imagen' src='/imagenes/yury.jpg'></p>
            <p>Director ejecutivo, TD<img class='c-quienes-somos__equipo-imagen' src='/imagenes/toni.jpg'></p>
            <p>Master del universo, JL<img class='c-quienes-somos__equipo-imagen' src='/imagenes/jl.jpg'></p>
            </div>
            </div>`
        },*/
        attCliente: {
            es: `<div class='c-quienes-somos__attCliente'>
            <p class='c-quienes-somos__titulo-menor'>Atención al cliente</p>
            <p><i class="fas fa-phone"></i>902 - 123- 469</p>
            <p><i class="far fa-envelope"></i>* info@weekfood.com</p>
            <p><i class="fab fa-whatsapp"></i>* 603 - 123- 469</p>
            <p>*(Atención automatizada)</p>
            </div>`
        },
        redes: {
            es: `<div class='c-quienes-somos__redes'>
            <p class='c-quienes-somos__titulo-menor'>¡Siguenos en nuestras redes sociales!</p>
            <p><i class="fab fa-instagram"></i> @WeekFood</p>
            <p><i class="fab fa-twitter"></i></i> @WeekFood</p>
            <p><i class="fab fa-facebook"></i> /WeekFood</p>
            </div>`
        }

    }
    if (!idioma) { idioma = 'es' }
    var html = `<div class='c-quienes-somos'>
    <div class='c-quienes-somos__banderas'>`
    for (var idiomaAdmitido in contenido.bandera) {
        html += "<div class='c-quienes-somos__contenedor-bandera"
        if (idiomaAdmitido == idioma) {
            html += " c-quienes-somos__contenedor-bandera--seleccionada"
        }
        html += `'>
                <img class='c-quienes-somos__bandera' src='/imagenes/bandera_` + contenido.bandera[idiomaAdmitido]
        html += `.png' onclick="cargarVista('quienesSomos','` + idiomaAdmitido + `')">
                </div>`
    }
    html += '</div>'
    html += cargarEnIdioma(contenido, 'cabecera', idioma)
    html += cargarEnIdioma(contenido, 'contenido', idioma)
    //html += cargarEnIdioma(contenido, 'equipo', idioma)
    html += cargarEnIdioma(contenido, 'attCliente', idioma)
    html += cargarEnIdioma(contenido, 'redes', idioma)
    html += "</div>"
    $(puntoMontaje).html(html)
}