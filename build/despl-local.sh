#!/bin/bash
set -e
if [ "$EUID" -eq 0 ]; then
    echo "Copiando dist/ a /var/www/html..."
    sudo rm /var/www/html -rf && 
    sudo mkdir /var/www/html &&
    sudo cp ./build/config/htaccess /var/www/html/.htaccess &&
    sudo cp ./dist/* /var/www/html/ -r
    echo "Copiado correctamente."
else
    echo "Ejecutame como root."
    exit 1
fi