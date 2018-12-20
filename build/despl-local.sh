#!/bin/bash
if [ "$EUID" -ne 0 ]; then
    ./build/build.sh
    echo "Copiando a /var/www/html..."
    sudo rm /var/www/html -rf
    sudo mkdir /var/www/html
    sudo cp ./build/config/htaccess /var/www/html/.htaccess
    sudo cp ./dist/* /var/www/html/ -r
    echo "Copiado correctamente."
else
    echo "No me ejecutes como ROOT."
    exit 1
fi