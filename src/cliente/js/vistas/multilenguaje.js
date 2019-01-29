function vista_QuienesSomos(puntoMontaje, idioma) {
    var contenido = {
        bandera: { es: "ES", en: "EN" }, // http://www.countryflags.com iconos
        cabecera: {
            en: `<div class='c-quienes-somos__cabecera'>
            <p class='c-quienes-somos__titulo'>About us?</p>
            <p class='c-quienes-somos__titulo-menor'>We are a fictitious company, for the final project of Web Application Development.</p>
            </div>`
        },
        contenido: {
            es: `<div class='c-quienes-somos__contenido'>
            <div class='c-quienes-somos__cabecera'>
            <p class='c-quienes-somos__titulo'>¿Quienes somos?</p>
            </div>
            <div class='c-quienes-somos__contenido-interno'>
            <p class='c-quienes-somos__texto'>Somos una empresa que gestiona el reparto de casas de comida.
            Hola a todos, somos una web para gestionar encargos a casas de comidas.
            Nuestra idea de negocio se basa en, satisfacer la necesidad de comer comida casera
            sin que gasteis tiempo en cocinar y/o en planear.
            De este modo, vosotros podeis dedicar vuestro tiempo a otras cosas.</p>
            </div>
            <div class='c-quienes-somos__contenido-equipo'>
            <div class='c-quienes-somos__contenido-equipo-container'><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/yury.jpg'><div class='c-quienes-somos__texto'><i class="fas fa-laptop"></i>Jefe de operaciones, YB</div></div>
            <div class='c-quienes-somos__contenido-equipo-container'><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/toni.jpg'><div class='c-quienes-somos__texto'><i class="fas fa-laptop"></i>Director ejecutivo, TD</div></div>
            <div class='c-quienes-somos__contenido-equipo-container'><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/jl.jpg'><div class='c-quienes-somos__texto'><i class="fas fa-blind"></i>Master del universo, JL</div></div>
            </div>
            <div class='c-quienes-somos__servicios'>
            <div class='c-quienes-somos__attCliente'>
            <p class='c-quienes-somos__titulo-menor'>Si tienes alguna duda, no dudes en contactar con nosotros</p>
            <p><i class="fas fa-phone"></i>902 - 123- 469</p>
            <p><i class="far fa-envelope"></i>* info@weekfood.com</p>
            <p><i class="fab fa-whatsapp"></i>* 603 - 123- 469</p>
            <p>*(Atención automatizada)</p>
            </div>
            <div class='c-quienes-somos__redes'>
            <p class='c-quienes-somos__titulo-menor'>¡Siguenos en nuestras redes sociales!</p>
            <p><i class="fab fa-instagram"></i> @WeekFood</p>
            <p><i class="fab fa-twitter"></i></i> @WeekFood</p>
            <p><i class="fab fa-facebook"></i> /WeekFood</p>
            </div>
            </div>
            </div>
            </div>`,
            en: `<div class='c-quienes-somos__contenido'>
            <div class='c-quienes-somos__contenido-interno'>
            <p>Hola a todos, somos una web para gestionar encargos a casas de comidas.</p>
            <p>Nuestra idea de negocio se basa en, satisfacer la necesidad de comer comida casera</p>
            <p>sin que gasteis tiempo en cocinar y/o en planear.</p>
            <p>De este modo, vosotros podeis dedicar vuestro tiempo a otras cosas.</p>
            <p class='c-quienes-somos__titulo-menor'>Payroll from WeekFood</p>
            <div class='c-quienes-somos__contenido-equipo'>
            <div class='c-quienes-somos__contenido-equipo-container'><i class="fas fa-laptop"></i>Jefe de operaciones, YB<img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/yury.jpg'></div>
            <div class='c-quienes-somos__contenido-equipo-container'><i class="fas fa-laptop"></i>Director ejecutivo, TD<img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/toni.jpg'></div>
            <div class='c-quienes-somos__contenido-equipo-container'><i class="fas fa-blind"></i>Master of univers, JL<img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/jl.jpg'></div>
            </div>
            <div class='c-quienes-somos__servicios'>
            <div class='c-quienes-somos__attCliente'>
            <p class='c-quienes-somos__titulo-menor'>Atención al cliente</p>
            <p><i class="fas fa-phone"></i>902 - 123- 469</p>
            <p><i class="far fa-envelope"></i>* info@weekfood.com</p>
            <p><i style="color:green;" class="fab fa-whatsapp"></i>* 603 - 123- 469</p>
            <p>*(Atención automatizada)</p>
            </div>
            <div class='c-quienes-somos__redes'>
            <p class='c-quienes-somos__titulo-menor'>¡Siguenos en nuestras redes sociales!</p>
            <p><i style="color:pink;" class="fab fa-instagram"></i> @WeekFood</p>
            <p><i style="color:lightblue;" class="fab fa-twitter"></i></i> @WeekFood</p>
            <p><i style="color:blue;" class="fab fa-facebook"></i> /WeekFood</p>
            </div>
            </div>
            </div>
            </div>`
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
        /*attCliente: {
            es: `<div class='c-quienes-somos__attCliente'>
            <p class='c-quienes-somos__titulo-menor'>Atención al cliente</p>
            <p><i class="fas fa-phone"></i>902 - 123- 469</p>
            <p><i class="far fa-envelope"></i>* info@weekfood.com</p>
            <p><i class="fab fa-whatsapp"></i>* 603 - 123- 469</p>
            <p>*(Atención automatizada)</p>
            </div>`
        },*/
        /*redes: {
            es: `<div class='c-quienes-somos__redes'>
            <p class='c-quienes-somos__titulo-menor'>¡Siguenos en nuestras redes sociales!</p>
            <p><i class="fab fa-instagram"></i> @WeekFood</p>
            <p><i class="fab fa-twitter"></i></i> @WeekFood</p>
            <p><i class="fab fa-facebook"></i> /WeekFood</p>
            </div>`
        }*/

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
    //html += cargarEnIdioma(contenido, 'cabecera', idioma)
    html += cargarEnIdioma(contenido, 'contenido', idioma)
    //html += cargarEnIdioma(contenido, 'equipo', idioma)
    //html += cargarEnIdioma(contenido, 'attCliente', idioma)
    //html += cargarEnIdioma(contenido, 'redes', idioma)
    //html += "</div>"
    $(puntoMontaje).html(html)
}