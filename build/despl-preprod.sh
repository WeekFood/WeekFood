#!/bin/bash
echo "Copiando dist/ a ../www"
rm ../www -rf && 
mkdir ../www &&
cp ./build/config/htaccess ../www/.htaccess &&
cp ./dist/* /../www -r
echo "Copiado correctamente."