function alternarCarrito(){
    if ($(".c-carrito").length < 1){
        var html = "<div class='c-carrito c-principal'>"
        carrito.getArticulos().forEach(element => {
            html += ''
        });
        html += "</div>"
        $(".p-principal").prepend(html)
    }else{
        $(".c-carrito").remove()
    }
}