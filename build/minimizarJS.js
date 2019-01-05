var compressor = require('node-minify');
var globby = require('globby');
var rimraf = require('rimraf');

compressor.minify({
    compressor: 'gcc',
    input: 'src/app/views/cliente/js/vistas/*.js',
    output: 'dist/js/temp_vistas.js',
    callback: function (err, min) { }
});
compressor.minify({
    compressor: 'gcc',
    input: 'src/app/views/cliente/js/componentes/*.js',
    output: 'dist/js/temp_componentes.js',
    callback: function (err, min) { }
});
compressor.minify({
    compressor: 'gcc',
    input: 'src/app/views/cliente/js/*.js',
    output: 'dist/js/temp_main.js',
    callback: function (err, min) { }
});
compressor.minify({
    compressor: 'gcc',
    input: 'dist/js/*.js',
    output: 'dist/js/WeekFood.js',
    callback: function (err, min) { }
});

globby(['dist/js/temp_*.js'])
    .then(function then(paths) {
        paths.map(function map(item) {
            rimraf.sync(item);
        });
    });