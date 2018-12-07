printf "\n- - - - - - - - - - - - - - - \n"
date +"%T"
printf "Construyendo...\n"
printf "\tEliminando dist/\n"
rm dist -rf
printf "\tCreando árbol vacio\n"
mkdir dist
mkdir dist/app dist/config dist/core dist/css dist/js dist/modelo dist/vista
printf "\tCopiando archivos servidor\n"
rsync -a src/ dist/ --exclude vista/cliente
printf "\tCompilando SASS y TypeScript\n"
sass src/vista/cliente/scss/estilo.scss dist/css/estilo.css
printf "\t\tSASS compilado.\n"
tsc src/vista/cliente/ts/* --outDir dist/js/
printf "\t\tTypeScript compilado.\n"

du -h dist
printf "\nDesplegado satisfactoriamente.\n"
#tree