printf "\n- - - - - - - - - - - - - - - \n"
date +"%T"
printf "Construyendo...\n"
printf "\tEliminando dist/\n"
rm dist -rf
printf "\tCreando árbol vacio\n"
mkdir dist
mkdir dist/css dist/js dist/imagenes
printf "\tCopiando archivos servidor\n"
cp src/* dist/ -r
rm dist/vista/cliente -r
cp src/vista/cliente/imagenes/* dist/imagenes 
printf "\tCompilando SASS y TypeScript\n"
sass src/vista/cliente/scss/estilo.scss dist/css/estilo.css
printf "\t\tSASS compilado.\n"
tsc src/vista/cliente/ts/* --outDir dist/js/
printf "\t\tTypeScript compilado.\n"
du -h dist
printf "\nDesplegado satisfactoriamente.\n"