#!/bin/bash
set -e # salir si cualquier comando no sale con 0 [https://stackoverflow.com/a/2871034/3499595]
shopt -s globstar # activar el glob ** para poder recorrer directorios recursivamente [https://unix.stackexchange.com/a/49917/295092]
shopt -s extglob # activar !()

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
    rm -r dist/cliente/{scss,js}
    # borrar directorios copiados que fueron generados por el entorno de desarrollo
    rm -rf dist/cliente/css
printf "\t> Compilando Sass\n"
    node-sass --quiet --output-style compressed --source-map true src/cliente/scss/estilo.scss --output dist/css
    printf "\t\t> Sass compilado.\n"
printf "\t> Montando js.\n"
    npm run --silent miniJS
printf "\t> Construyendo admin\n"
    printf "\t\t> Creando directorio ./dist/admin\n"
    mkdir ./dist/admin
    printf "\t\t> Cambiando a ./admin\n"
    cd ./admin
    printf "\t\t> Ejecutando ng build (local) \n"
    ./node_modules/.bin/ng build --configuration=local # --prod
    printf "\t\t> Copiando todos los recursos generados, menos index.html\n a ../dist\n"
    cp -r ./dist/WeekFood/!(index.html) ../dist/
    printf "\t\t> Copiando index.html a ../dist/admin\n"
    cp ./dist/WeekFood/index.html ../dist/admin/

printf "\nConstruido satisfactoriamente.\n\t> Total: "
du -h dist | tail -n 1 | awk '{print $1}'
