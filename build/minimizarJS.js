var compressor = require('node-minify');
var globby = require('globby');
var rimraf = require('rimraf');

compressor.minify({
    compressor: 'gcc',
    input: ['src/app/views/cliente/js/*.js','src/app/views/cliente/js/*/*.js'],
    output: 'dist/js/WeekFood.js',
    callback: function (err, min) { }
});

globby(['dist/js/temp_*.js'])
    .then(function then(paths) {
        paths.map(function map(item) {
            rimraf.sync(item);
        });
    });