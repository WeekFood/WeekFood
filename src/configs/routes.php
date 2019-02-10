<?php

return [
    "get" => [
        "/" => [
            "route" => "/",
            "resource" => "cliente",
            "action" => "index"
        ],
        "Admin" => [
            "route" => "/admin",
            "resource" => "admin",
            "action" => "index"
        ],
        "API" => [
            "route" => "api",
            "resource" => "api",
            "action" => "error"
        ],
        "API, carrusel" => [
            "route" => "api/carrusel",
            "resource" => "productos",
            "action" => "getCarrusel"
        ],
        "API, menu" => [
            "route" => "api/menu",
            "resource" => "menu",
            "action" => "getTodos"
        ],
        "API, productos" => [
            "route" => "api/productos",
            "resource" => "productos",
            "action" => "getTodos"
        ],
        "API, productos, query todas categorias principales" => [
            "route" => "api/productos/categorias",
            "resource" => "productos",
            "action" => "getCategoriasPrincipales"
        ],
        "API, productos, query categorias principales" => [
            "route" => "api/productos/categorias/:nombre/subcategorias",
            "resource" => "productos",
            "action" => "getCategoriaPrincipal"
        ],
        "API, productos, query categorias" => [
            "route" => "api/productos?categoria=:categoria",
            "resource" => "productos",
            "action" => "getCategoria"
        ],
        "API, productos, categorias" => [
            "route" => "api/productos/categorias/subcategorias",
            "resource" => "productos",
            "action" => "getCategorias"
        ],
        "API, Productos destacados" => [
            "route" => "api/productos?destacado=:destacado",
            "resource" => "productos",
            "action" => "getDestacados"
        ],
        "API, Productos, por id" => [
            "route" => "api/productos/:id",
            "resource" => "productos",
            "action" => "getProductoID"
        ],
        "API, carritos por id usuario" => [
            "route" => "api/carritos?usuario=:idUsuario",
            "resource" => "carritos",
            "action" => "getCarrito"
        ],
        "API, datos de usuario" => [
            "route" => "api/usuarios/:idUsuario",
            "resource" => "usuarios",
            "action" => "getUsuario"
        ],
        "API, Auth, renovar login" => [
            "route" => "api/auth/renovar_login",
            "resource" => "auth",
            "action" => "getRenovarLogin"
        ],
        "API, Auth, logout" => [
            "route" => "api/auth/logout",
            "resource" => "auth",
            "action" => "getLogout"
        ],
        "API, usuario nivel privilegio" => [
            "route" => "api/usuarios/:idUsuario/nivelPrivilegio",
            "resource" => "usuarios",
            "action" => "getNivelPrivilegio"
        ]
    ],
    "post" => [
        "API, carrito" => [
            "route" => "api/carritos",
            "resource" => "carritos",
            "action" => "postCarrito"
        ],
        "API, Auth, registro" => [
            "route" => "api/auth/registro",
            "resource" => "auth",
            "action" => "postRegistro"
        ],
        "API, Auth, login" => [
            "route" => "api/auth/login",
            "resource" => "auth",
            "action" => "postLogin"
        ],
        "API, Auth, usuario ya existe" => [
            "route" => "api/auth/usuario_ya_existe",
            "resource" => "auth",
            "action" => "postUsuarioYaExiste"
        ]
    ],
    "put" => [
        "API, carrito" => [
            "route" => "api/carritos/:id",
            "resource" => "carritos",
            "action" => "putCarrito"
        ]
    ],
    "delete" => [
    ]
];
