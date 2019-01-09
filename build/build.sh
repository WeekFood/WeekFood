#!/bin/bash
set -e # salir si cualquier comando no sale con 0 [https://stackoverflow.com/a/2871034/3499595]
shopt -s globstar # activar el glob ** para poder recorrer directorios recursivamente [https://unix.stackexchange.com/a/49917/295092]
date +"%T"

printf "Construyendo\n"
printf "\t> Eliminando dist/\n"
    rm -rf dist
printf "\t> Creando directorio dist/\n"
    mkdir dist
printf "\t> Copiando archivos\n"
    cp -r src/* dist/
    mkdir dist/js
    mv dist/cliente/libs dist/libs
    mv dist/cliente/imagenes dist/imagenes
    mv dist/cliente/fonts dist/fonts
    # borrar directorios copiados que se tienen que construir en vez de copiar/mover
    rm -r dist/cliente/scss
printf "\t> Compilando Sass\n"
    node-sass --quiet --output-style compressed --source-map true src/cliente/scss/estilo.scss --output dist/css
    printf "\t\t> Sass compilado.\n"
printf "\t> Montando js.\n"
    npm run --silent miniJS

printf "\nConstruido satisfactoriamente.\n\t> Total: "
du -h dist | tail -n 1 | awk '{print $1}'