class Usuario {
    constructor() {
        this.imagen = undefined
        this.erroresAcceso = [
            "Usuario y contraseña no coinciden"
        ]
        this.erroresRegistro = [
            "El usuario ya existe",
            "El usuario no es valido, minimo 4 carácteres",
            "La contraseña no es valida, minimo 6 carácteres",
            "Las contraseñas no coinciden",
        ]
    }
    validarRegistro(usuario, pass, passRepe) {
        var errores = []
        if (usuario.length < 4) {
            errores.push(1)
        }
        if (pass.length < 6) {
            errores.push(2)
        } else if (!pass.localeCompare(passRepe) == 0) {
            errores.push(3)
        }
        return errores
    }
    acceder(usuario, pass) {
        return $.post({
            url: "/api/auth/login",
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: "nick=" + usuario + "&contraseña=" + pass
        })
    }
    acceso_RegistroUsuarioLibre(usuario){
        return $.post({
            url: "/api/auth/usuarioLibre",
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: "nick=" + usuario 
        })
    }
}