let carrito = new Carrito();

let productoDesdeAPI = new Producto(
    1,
    'Patatas fritas',
    'patatas-fritas.png',
    false
);

let articulo = new Articulo(productoDesdeAPI);

carrito.añadirArticulo(articulo);

console.dir(carrito.articulos);