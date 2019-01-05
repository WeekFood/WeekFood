const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');

minify({
    compressor: cleanCSS,
    input: 'dist/css/estilo.css',
    output: 'dist/css/estilo.css',
    callback: function (err, min) { }
});
