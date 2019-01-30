function vista_QuienesSomos(puntoMontaje, idioma) {
    var contenido = {
        bandera: { es: "ES", en: "EN" }, // http://www.countryflags.com iconos
        contenido: {
            es: `<div class='c-quienes-somos__contenido'>
            <div class='c-quienes-somos__cabecera'>
            <p class='c-quienes-somos__titulo'>¿Quienes somos?</p>
            </div>
            <div class='c-quienes-somos__contenido-interno'>
            <p class='c-quienes-somos__texto'>Somos una empresa que gestiona el reparto de casas de comida.</p>
            <p class='c-quienes-somos__texto'>Nuestra idea de negocio se basa en, satisfacer la necesidad de comer comida casera
            sin que gasteis tiempo en cocinar y/o en planear.</p>
            <p class='c-quienes-somos__texto'>De este modo, vosotros podeis dedicar vuestro tiempo a otras cosas.</p>
            </div>
            <div class='c-quienes-somos__contenido-equipo'>
            <div class='c-quienes-somos__contenido-equipo-container'><div class='c-quienes-somos__texto'>Yuriy</div><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/yury.jpg'><div class='c-quienes-somos__texto'>Programador Jefe</div></div>
            <div class='c-quienes-somos__contenido-equipo-container'><div class='c-quienes-somos__texto'>Toni</div><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/toni.jpg'><div class='c-quienes-somos__texto'>Director Ejecutivo</div></div>
            <div class='c-quienes-somos__contenido-equipo-container'><div class='c-quienes-somos__texto'>José Luis</div><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/jl.jpg'><div class='c-quienes-somos__texto'>Diseñador</div></div>
            </div>
            <div class='c-quienes-somos__servicios'>
            <div class='c-quienes-somos__attCliente'>
            <p class='c-quienes-somos__titulo-menor'>No dudes en contactar con nosotros.</p>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fas fa-phone"></i></div><div class='c-quienes-somos__texto-icono'>902 - 123- 469</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="far fa-envelope"></i></div><div class='c-quienes-somos__texto-icono'>info@weekfood.com</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-whatsapp"></i></div><div class='c-quienes-somos__texto-icono'>603 - 123- 469</div></div>
            </div>
            <div class='c-quienes-somos__redes'>
            <p class='c-quienes-somos__titulo-menor'>¡Siguenos en nuestras redes sociales!</p>
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
            <p class='c-quienes-somos__texto'>We are a company that manages the distribution of food houses.</p>
            <p class='c-quienes-somos__texto'>Our business idea is based on, satisfying the need to eat homemade food
            without spending time cooking or planning.</p>
            <p class='c-quienes-somos__texto'>In this way, you can dedicate your time to other things.</p>
            </div>
            <div class='c-quienes-somos__contenido-equipo'>
            <div class='c-quienes-somos__contenido-equipo-container'><div class='c-quienes-somos__texto'>Yuriy</div><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/yury.jpg'><div class='c-quienes-somos__texto'>Chief Programmer</div></div>
            <div class='c-quienes-somos__contenido-equipo-container'><div class='c-quienes-somos__texto'>Toni</div><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/toni.jpg'><div class='c-quienes-somos__texto'>CEO</div></div>
            <div class='c-quienes-somos__contenido-equipo-container'><div class='c-quienes-somos__texto'>José Luis</div><img class='c-quienes-somos__contenido-equipo-imagen' src='/imagenes/jl.jpg'><div class='c-quienes-somos__texto'>Designer</div></div>
            </div>
            <div class='c-quienes-somos__servicios'>
            <div class='c-quienes-somos__attCliente'>
            <p class='c-quienes-somos__titulo-menor'>If you have some doubt, contact us.</p>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fas fa-phone"></i></div><div class='c-quienes-somos__texto-icono'>902 - 123- 469</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="far fa-envelope"></i></div><div class='c-quienes-somos__texto-icono'>info@weekfood.com</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-whatsapp"></i></div><div class='c-quienes-somos__texto-icono'>603 - 123- 469</div></div>
            </div>
            <div class='c-quienes-somos__redes'>
            <p class='c-quienes-somos__titulo-menor'>Follow in our social medias!</p>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-instagram"></i></div><div class='c-quienes-somos__texto-icono'>@WeekFood</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-twitter"></i></div></i><div class='c-quienes-somos__texto-icono'>@WeekFood</div></div>
            <div class='c-quienes-somos__servicios-container'><div class='c-quienes-somos__servicios-icono'><i class="fab fa-facebook"></i></div><div class='c-quienes-somos__texto-icono'>/WeekFood</div></div>
            </div>
            </div>
            </div>
            </div>`
        },
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
    html += cargarEnIdioma(contenido, 'contenido', idioma)
    $(puntoMontaje).html(html)
}