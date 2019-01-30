function vista_QuienesSomos(puntoMontaje, idioma) {
    var contenido = {
        bandera: { es: "ES", en: "EN" }, // http://www.countryflags.com iconos
        contenido: {
            es: `<div class='c-quienes-somos__contenido'>
            <div class='c-quienes-somos__cabecera'>
            <p class='c-quienes-somos__titulo'>¿Quienes somos?</p>
            </div>
            <div class='c-quienes-somos__contenido-interno'>
            <p class='c-quienes-somos__texto'>Somos una empresa que gestiona el reparto de casas de comida.
            Nuestra idea de negocio se basa en, satisfacer la necesidad de comer comida casera
            sin que gasteis tiempo en cocinar y/o en planear.
            De este modo, vosotros podeis dedicar vuestro tiempo a otras cosas.</p>
            </div>
            <div class='c-quienes-somos__contenido-equipo'>
            <div class='c-quienes-somos__contenido-equipo-container'><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/yury.jpg'><div class='c-quienes-somos__texto'>Yuriy Burychka</div></div>
            <div class='c-quienes-somos__contenido-equipo-container'><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/toni.jpg'><div class='c-quienes-somos__texto'>Juan Antonio Donet Peiró</div></div>
            <div class='c-quienes-somos__contenido-equipo-container'><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/jl.jpg'><div class='c-quienes-somos__texto'>José Luis Sanchez Delgado</div></div>
            </div>
            <div class='c-quienes-somos__servicios'>
            <div class='c-quienes-somos__attCliente'>
            <p class='c-quienes-somos__texto'>Si tienes alguna duda, no dudes en contactar con nosotros.</p>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fas fa-phone"></i></div><div class='c-quienes-somos__texto-icono'>902 - 123- 469</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="far fa-envelope"></i></div><div class='c-quienes-somos__texto-icono'>info@weekfood.com</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-whatsapp"></i></div><div class='c-quienes-somos__texto-icono'>603 - 123- 469</div></div>
            </div>
            <div class='c-quienes-somos__redes'>
            <p class='c-quienes-somos__texto'>¡Siguenos en nuestras redes sociales!</p>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-instagram"></i></div><div class='c-quienes-somos__texto-icono'>@WeekFood</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-twitter"></i></div></i><div class='c-quienes-somos__texto-icono'>@WeekFood</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-facebook"></i></div><div class='c-quienes-somos__texto-icono'>/WeekFood</div></div>
            </div>
            </div>
            </div>
            </div>`,
            en: `<div class='c-quienes-somos__contenido'>
            <div class='c-quienes-somos__cabecera'>
            <p class='c-quienes-somos__titulo'>About us?</p>
            </div>
            <div class='c-quienes-somos__contenido-interno'>
            <p class='c-quienes-somos__texto'>We are a company that manages the distribution of food houses.
            Our business idea is based on, satisfying the need to eat homemade food
            without spending time cooking or planning.
            In this way, you can dedicate your time to other things.</p>
            </div>
            <div class='c-quienes-somos__contenido-equipo'>
            <div class='c-quienes-somos__contenido-equipo-container'><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/yury.jpg'><div class='c-quienes-somos__texto'>Yuriy Burychka</div></div>
            <div class='c-quienes-somos__contenido-equipo-container'><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/toni.jpg'><div class='c-quienes-somos__texto'>Juan Antonio Donet Peiró</div></div>
            <div class='c-quienes-somos__contenido-equipo-container'><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/jl.jpg'><div class='c-quienes-somos__texto'>José Luis Sanchez Delgado</div></div>
            </div>
            <div class='c-quienes-somos__servicios'>
            <div class='c-quienes-somos__attCliente'>
            <p class='c-quienes-somos__texto'>If you have some doubt, contact us.</p>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fas fa-phone"></i></div><div class='c-quienes-somos__texto-icono'>902 - 123- 469</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="far fa-envelope"></i></div><div class='c-quienes-somos__texto-icono'>info@weekfood.com</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-whatsapp"></i></div><div class='c-quienes-somos__texto-icono'>603 - 123- 469</div></div>
            </div>
            <div class='c-quienes-somos__redes'>
            <p class='c-quienes-somos__texto'>Follow in our social medias!</p>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-instagram"></i></div><div class='c-quienes-somos__texto-icono'>@WeekFood</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-twitter"></i></div></i><div class='c-quienes-somos__texto-icono'>@WeekFood</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-facebook"></i></div><div class='c-quienes-somos__texto-icono'>/WeekFood</div></div>
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