class Usuario {
    constructor() {
        this.id = undefined
        this.foto = undefined
        this.nick = undefined
        this.nombre = undefined
        this.apellidos = undefined
        this.erroresAcceso = {
            Usu_No_Existe: "Usuario no existe",
            Cont_No_Valido: "Contraseña no es valida",
            Usu_Vacio: "Usuario está vacio",
            Cont_Vacio: "Contraseña está vacia"
        }

        this.erroresRegistro = {
            Usu_Ya_Existe: "El usuario ya existe",
            Usu_Lon_Insuficiente: "El usuario no es valido, minimo 4 carácteres",
            Cont_Lon_Insuficiente: "La contraseña no es valida, minimo 6 carácteres",
            Cont_No_Coinciden: "Las contraseñas no coinciden"
        }

        this.errorGenerico = "Algo ha fallado. Vuelve a intentarlo más tarde."
    }
    validarAcceso(usuario, pass) {
        var errores = []
        if (usuario.length == 0) {
            errores.push("Usu_Vacio")
        }
        if (pass.length == 0) {
            errores.push("Cont_Vacio")
        }
        return errores
    }
    validarRegistro(usuario, pass, passRepe) {
        var errores = []
        if (usuario.length < 4) {
            errores.push("Usu_Lon_Insuficiente")
        }
        if (pass.length < 6) {
            errores.push("Cont_Lon_Insuficiente")
        } else if (pass !== passRepe) {
            errores.push("Cont_No_Coinciden")
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
    renovarToken() {
        return $.getJSON("/api/auth/renovar_login")
    }
    cerrarSesion() {
        return $.getJSON("/api/auth/logout")
    }
}