#!/bin/bash
set -e

shopt -s globstar # **
shopt -s extglob # !()

printf "> Borrando ./dist\n"
rm -rf ./dist
printf "> Creando ./dist\n"
mkdir ./dist
printf "> Borrando ./dist/crud\n"
mkdir ./dist/crud

printf "> Cambiando a ./crud\n"
cd ./crud
printf "\t> Ejecutando ng build\n"
./node_modules/.bin/ng build --configuration=local # --prod
printf "\t> Copiando todos los recursos generados, menos index.html\n a ../dist\n"
cp -r ./dist/WeekFood/!(index.html) ../dist/
printf "\t> Copiando index.html a ../dist/crud\n"
cp ./dist/WeekFood/index.html ../dist/crud/