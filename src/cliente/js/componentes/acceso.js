function acceso_Alternar() {
    if ($(".c-carrito").length == 1) {
        if (!$(".c-carrito").hasClass("c-carrito--desaparecer")) {
            carrito_Alternar()
        }
    }
    if ($(".c-acceso").length < 1) {
        $(".p-principal").prepend(`<div data-modo="1" class='c-acceso'>
            <p class="c-acceso__titulo">Acceso</p>
            <input class="c-acceso__campo js-acceso__nombre" type="text" placeholder="Usuario">
            <input class="c-acceso__campo js-acceso__contra" type="text" placeholder="Contraseña">
            <input class="c-acceso__campo" id="acceso-login__contra-repe" type="text" placeholder="Contraseña">
            <div class="c-acceso__botones">
            <div class="c-boton c-boton--basico c-acceso__boton js-acceso__entrar">Entrar</div>
            <div class="c-boton c-boton--basico c-acceso__boton js-acceso__registro">Registrarme</div>
            </div></div>`)
            $(".js-acceso__entrar").on('click', acceso_Entrar);
            $(".js-acceso__registro").on('click', acceso_Registro);
    } else {
        $(".c-acceso").toggleClass("c-acceso__panel--desaparecer")
    }
    $(".js-acceso").children("i").toggleClass("fa-angle-up").toggleClass("fa-user")
}
function acceso_Entrar(){
    if($(".c-acceso").data("modo") == 1){
        console.log($(".js-acceso__nombre").val())
        console.log($(".js-acceso__contra").val())
    }
}
function acceso_Registro(){

}