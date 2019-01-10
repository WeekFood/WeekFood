#!/bin/bash
echo "Copiando dist/ a ../www"
rm ../www -rf && 
mkdir ../www &&
cp ./build/config/htaccess ../www/.htaccess &&
cp ./dist/* /../www -r
mv ../www/configs/preprod_config.php ../www/configs/config.php
echo "Copiado correctamente."