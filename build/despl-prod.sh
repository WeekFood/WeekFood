#!/bin/bash
set -e
echo "Copiando dist/ a ../../www"
rm ../../www/* -rf && 
cp ./build/config/htaccess ../../www/.htaccess &&
cp ./dist/* ../../www -r &&
rm ../../www/configs/preprod_config.php &&
mv ../../www/configs/prod_config.php ../../www/configs/config.php
echo "Copiado correctamente."