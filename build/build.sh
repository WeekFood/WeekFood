#!/bin/bash
set -e # salir si cualquier comando no sale con 0 [https://stackoverflow.com/a/2871034/3499595]
shopt -s globstar # activar el glob ** para poder recorrer directorios recursivamente [https://unix.stackexchange.com/a/49917/295092]
date +"%T"
function server {
    printf "Desplegando servidor\n"
    printf "\t> Eliminando server de dist/\n"
        rm -r dist/{app,configs,core}
    printf "\t> Copiando\n"
        mkdir -p dist/app/views/
        cp src/{configs,core} dist/ -r
        cp src/app/views/*.php dist/app/views/
        cp src/app/{controllers,models} dist/app -r
    printf "\t> Finalizado\n"
}
function cliente {
    printf "Desplegando cliente\n"
    printf "\t> Eliminando css y js de dist/\n"
        rm -r dist/{js,css}
    printf "\t> Creando directorios\n"
        mkdir dist/{js,css}
    printf "\t> Compilando Sass\n"
        node-sass --quiet --output-style expanded --source-map true src/app/views/cliente/scss/estilo.scss --output dist/css
        printf "\t\t> Sass compilado.\n"
        printf "\t\t> Montando CSS.\n"
        npm run --silent miniCSS
    printf "\t> Montando js\n"
        npm run --silent miniJS
}
function estaticos {
    printf "Desplegando estaticos\n"
    printf "\t> Re-desplegando Imagenes\n"
        rm dist/imagenes -rf
        cp src/app/views/cliente/imagenes dist/ -r
    printf "\t> Re-desplegando Libs\n"
        rm dist/libs -rf
        cp src/app/views/cliente/libs dist/ -r
    printf "\t> Re-desplegando Fonts\n"
        rm dist/fonts -rf
        cp src/app/views/cliente/fonts dist/ -r
}
if [ $# -eq 0 ]; then
    printf "Construyendo\n"
    printf "\t> Eliminando dist/\n"
        rm -rf dist
    printf "\t> Creando directorio dist/\n"
        mkdir dist
    printf "\t> Copiando archivos\n"
        cp -r src/* dist/
        mkdir dist/js
        mv dist/app/views/cliente/libs dist/libs
        mv dist/app/views/cliente/imagenes dist/imagenes
        mv dist/app/views/cliente/fonts dist/fonts
        # borrar directorios copiados que se tienen que construir en vez de copiar/mover
        rm -r dist/app/views/cliente/scss
    printf "\t> Compilando Sass\n"
        node-sass --quiet --output-style expanded --source-map true src/app/views/cliente/scss/estilo.scss --output dist/css
        printf "\t\t> Sass compilado.\n"
        printf "\t\t> Montando CSS.\n"
        npm run --silent miniCSS
    printf "\t> Montando js.\n"
        npm run --silent miniJS

else
    for parametro in "$@"; do
        $parametro
    done
fi
printf "\nConstruido satisfactoriamente.\n\t> Total: "
du -h dist | tail -n 1 | awk '{print $1}'