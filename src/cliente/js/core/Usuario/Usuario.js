class Usuario {
    constructor() {
        this.imagen = undefined
        this.erroresAcceso = [
            "El usuario no existe",
            "La contraseña no es válida"
        ]
        this.erroresRegistro = [
            "El usuario ya existe",
            "El usuario no es valido, minimo 4 carácteres",
            "La contraseña no es valida, minimo 6 carácteres",
            "Las contraseñas no coinciden",
        ]
        if (window.localStorage.hasOwnProperty("tokenAcceso")) {
            if (!this.accederConToken()) {
                console.error("EL TOKEN DEL USUARIO NO ES VALIDO")
                localStorage.clear()
            }
        }
    }
    validarAcceso(usuario, pass) {
        var errores = []
        // Todo conectar con server y autenticar
        if (this.existeElUsuario(usuario)) {
            errores.push(0)
        } else {
            if (this.acceder(usuario, pass)) {
                // Todo almacenar credenciales
            } else {
                errores.push(1)
            }
        }
        return errores
    }
    validarRegistro(usuario, pass, passRepe) {
        var errores = []
        if (this.existeElUsuario(usuario)) {
            errores.push(0)
        }
        if (usuario.length < 4) {
            errores.push(1)
        }
        if (pass.length < 6) {
            errores.push(2)
        } else if (!pass == passRepe) {
            errores.push(3)
        }
        if (errores.length == 0) {
            this.registrar(usuario, pass, passRepe)
        }
        return errores
    }
    existeElUsuario(usuario) {
        // Todo conectar con el server y comprobar
        return true
    }
    acceder(usuario, pass) {
        // Todo conectar con el server y comprobar
        return false
    }
    registrar(usuario, pass, passRepe) {
        // Todo conectar con el server y registrar
        return false
    }
    guardarCredenciales() {
        // Todo
    }
    accederConToken() {
        //Todo conectar a server, authenticar
        return false
    }
}