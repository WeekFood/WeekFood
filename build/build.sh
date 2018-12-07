printf "\n- - - - - - - - - - - - - - - \n"
date +"%T"
printf "Construyendo...\n"
printf "\tEliminando dist/\n"
rm dist -rf
printf "\tCreando árbol vacio\n"
mkdir dist
mkdir dist/css dist/js dist/imagenes
printf "\tCopiando archivos servidor\n"
rsync -a src/ dist/ --exclude vista/cliente
cp src/vista/cliente/imagenes/* dist/imagenes 
printf "\tCompilando SASS y TypeScript\n"
sass src/vista/cliente/scss/estilo.scss dist/css/estilo.css
printf "\t\tSASS compilado.\n"
tsc src/vista/cliente/ts/* --outDir dist/js/
printf "\t\tTypeScript compilado.\n"
for dire in $(find dist -empty -type d); do
    touch $dire/.gitkeep
    echo Creado $dire/.gitkeep
done
du -h dist
printf "\nDesplegado satisfactoriamente.\n"