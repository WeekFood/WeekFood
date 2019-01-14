var mini = require('@node-minify/core');
var ter = require('@node-minify/terser');

mini({
    compressor: ter,
    input: [
        'src/cliente/js/core/carrito/Carrito.js',
        'src/cliente/js/modelos/**/*.js',
        'src/cliente/js/componentes/**/*.js',
        'src/cliente/js/vistas/**/*.js',
        'src/cliente/js/abstractos.js',
        'src/cliente/js/funciones.js',
        'src/cliente/js/init.js',
        'src/cliente/js/__pruebas.js'
    ],
    output: process.argv[2] || 'dist/js/WeekFood.js',
    sourceMap: true
});