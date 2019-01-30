class Usuario {
    constructor() {
        this.id = undefined
        this.foto = undefined
        this.nick = undefined
        this.datos = undefined
        this.erroresAcceso = [
            "Usuario no existe",
            "Contraseña no es valida",
            "Usuario está vacio",
            "Contraseña está vacia",
        ]
        this.erroresRegistro = [
            "El usuario ya existe",
            "El usuario no es valido, minimo 4 carácteres",
            "La contraseña no es valida, minimo 6 carácteres",
            "Las contraseñas no coinciden",
        ]
        this.errorGenerico = "Algo ha fallado. Vuelve a intentarlo más tarde."
    }
    validarAcceso(usuario, pass) {
        var errores = []
        if (usuario.length == 0) {
            errores.push(2)
        }
        if (pass.length == 0) {
            errores.push(3)
        }
        return errores
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
            data: "nick=" + usuario + "&contraseña=" + pass + "&recuerdame=1"
        })
    }
    acceso_RegistroUsuarioLibre(usuario) {
        return $.post({
            url: "/api/auth/usuario_ya_existe",
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: "nick=" + usuario
        })
    }
    registrar(usuario, pass) {
        return $.post({
            url: "/api/auth/registro",
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: "nick=" + usuario + "&contraseña=" + pass
        })
    }
}