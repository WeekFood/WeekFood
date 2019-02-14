<?php

return [
    "get" => [
        "/" => [
            "route" => "/",
            "resource" => "cliente",
            "action" => "index",
            "nivelAuthGuard" => -1
        ],
        "Admin" => [
            "route" => "/admin",
            "resource" => "admin",
            "action" => "index",
            "nivelAuthGuard" => 9
        ],
        "API" => [
            "route" => "api",
            "resource" => "api",
            "action" => "error",
            "nivelAuthGuard" => -1
        ],
        "API, carrusel" => [
            "route" => "api/carrusel",
            "resource" => "productos",
            "action" => "getCarrusel",
            "nivelAuthGuard" => -1
        ],
        "API, menu" => [
            "route" => "api/menu",
            "resource" => "menu",
            "action" => "getTodos",
            "nivelAuthGuard" => -1
        ],
        "API, productos" => [
            "route" => "api/productos",
            "resource" => "productos",
            "action" => "getTodos",
            "nivelAuthGuard" => -1
        ],
        "API, productos, query todas categorias principales" => [
            "route" => "api/productos/categorias",
            "resource" => "productos",
            "action" => "getCategoriasPrincipales",
            "nivelAuthGuard" => -1
        ],
        "API, productos, query categorias principales" => [
            "route" => "api/productos/categorias/:nombre/subcategorias",
            "resource" => "productos",
            "action" => "getCategoriaPrincipal",
            "nivelAuthGuard" => -1
        ],
        "API, productos, query categorias" => [
            "route" => "api/productos?categoria=:categoria",
            "resource" => "productos",
            "action" => "getCategoria",
            "nivelAuthGuard" => -1
        ],
        "API, productos, categorias" => [
            "route" => "api/productos/categorias/subcategorias",
            "resource" => "productos",
            "action" => "getCategorias",
            "nivelAuthGuard" => -1
        ],
        "API, Productos destacados" => [
            "route" => "api/productos?destacado=:destacado",
            "resource" => "productos",
            "action" => "getDestacados",
            "nivelAuthGuard" => -1
        ],
        "API, Productos, por id" => [
            "route" => "api/productos/:id",
            "resource" => "productos",
            "action" => "getProductoID",
            "nivelAuthGuard" => -1
        ],
        "API, carritos por id usuario" => [
            "route" => "api/carritos?usuario=:idUsuario",
            "resource" => "carritos",
            "action" => "getCarrito",
            "nivelAuthGuard" => 0
        ],
        "API, datos de usuario" => [
            "route" => "api/usuarios/:idUsuario",
            "resource" => "usuarios",
            "action" => "getUsuario",
            "nivelAuthGuard" => 0
        ],
        "API, Auth, renovar login" => [
            "route" => "api/auth/renovar_login",
            "resource" => "auth",
            "action" => "getRenovarLogin",
            "nivelAuthGuard" => -1
        ],
        "API, Auth, logout" => [
            "route" => "api/auth/logout",
            "resource" => "auth",
            "action" => "getLogout",
            "nivelAuthGuard" => 0
        ],
        "API, usuario nivel privilegio" => [
            "route" => "api/usuarios/:idUsuario/nivelPrivilegio",
            "resource" => "usuarios",
            "action" => "getNivelPrivilegio",
            "nivelAuthGuard" => 0
        ]
    ],
    "post" => [
        "API, carrito" => [
            "route" => "api/carritos",
            "resource" => "carritos",
            "action" => "postCarrito",
            "nivelAuthGuard" => 0
        ],
        "API, Auth, registro" => [
            "route" => "api/auth/registro",
            "resource" => "auth",
            "action" => "postRegistro",
            "nivelAuthGuard" => -1
        ],
        "API, Auth, login" => [
            "route" => "api/auth/login",
            "resource" => "auth",
            "action" => "postLogin",
            "nivelAuthGuard" => -1
        ],
        "API, Auth, usuario ya existe" => [
            "route" => "api/auth/usuario_ya_existe",
            "resource" => "auth",
            "action" => "postUsuarioYaExiste",
            "nivelAuthGuard" => -1
        ],
        "CRUD, Productos, nuevo" => [
            "route" => "api/productos",
            "resource" => "productos",
            "action" => "postProducto",
            "nivelAuthGuard" => 9
        ],
        "CRUD, Categorias, nuevo" => [
            "route" => "api/productos/categorias",
            "resource" => "productos",
            "action" => "postCategoriaPrincipal",
            "nivelAuthGuard" => 9
        ]
    ],
    "put" => [
        "API, carrito" => [
            "route" => "api/carritos/:id",
            "resource" => "carritos",
            "action" => "putCarrito",
            "nivelAuthGuard" => 0
        ],
        "API, actualizar usuario" => [
            "route" => "api/usuarios/:idUsuario",
            "resource" => "usuarios",
            "action" => "putUsuario",
            "nivelAuthGuard" => 0
        ],
        "CRUD, Productos, editar" => [
            "route" => "api/productos/:id",
            "resource" => "productos",
            "action" => "putProducto",
            "nivelAuthGuard" => 9
        ],
        "CRUD, Categorias, editar" => [
            "route" => "api/productos/categorias/:nombre",
            "resource" => "productos",
            "action" => "putCategoriaPrincipal",
            "nivelAuthGuard" => 9
        ]
    ],
    "delete" => [
        "CRUD, Productos, borrar" => [
            "route" => "api/productos/:id",
            "resource" => "productos",
            "action" => "deleteProducto",
            "nivelAuthGuard" => 9
        ]
    ]
];
