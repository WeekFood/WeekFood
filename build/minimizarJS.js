var compressor = require('node-minify');

compressor.minify({
    compressor: 'gcc',
    input: ['src/app/views/cliente/js/*.js','src/app/views/cliente/js/*/*.js'],
    output: 'dist/js/WeekFood.js',
    callback: function (err, min) { }
});