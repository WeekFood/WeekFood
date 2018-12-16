#!/bin/bash

set -e # salir si cualquier comando no sale con 0 [https://stackoverflow.com/a/2871034/3499595]
shopt -s globstar # activar el glob ** para poder recorrer directorios recursivamente [https://unix.stackexchange.com/a/49917/295092]

date +"%T"
printf "Construyendo...\n"

printf "\t> Eliminando dist/\n"
    rm -rf dist

printf "\t> Creando directorio dist/\n"
    mkdir dist

printf "\t> Copiando archivos\n"
    cp -r src/* dist/

    mv dist/app/views/cliente/imagenes dist/imagenes
    # borrar directorios copiados que se tienen que construir en vez de copiar/mover
    rm -r dist/app/views/cliente/{scss,ts}

printf "\t> Compilando Sass\n"
    node-sass --quiet --output-style expanded --source-map true src/app/views/cliente/scss/estilo.scss --output dist/css
    printf "\t\t> Sass compilado.\n"

printf "\t> Compilando TypeScript\n"
    # ** recorre directorios recursivamente
    tsc src/app/views/cliente/ts/**/*.ts --out dist/js/script.js
    printf "\t\t> TypeScript compilado.\n\n"

du -h dist

printf "\nConstruido satisfactoriamente.\n"