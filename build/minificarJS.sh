#!/bin/bash
set -e
shopt -s globstar

# ruta por defecto si no se pasa parametro
OUTPUT=${1:-./dist/js/WeekFood.js}

terser \
    src/cliente/js/core/**/*.js \
    src/cliente/js/abstractos.js \
    src/cliente/js/funciones.js \
    src/cliente/js/componentes/**/*.js \
    src/cliente/js/vistas/**/*.js \
    src/cliente/js/init.js \
-o "$OUTPUT"