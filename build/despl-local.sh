#!/bin/bash
if [ "$EUID" -eq 0 ]; then
    ./build/build.sh
    rm /var/www/html -rf
    mkdir /var/www/html
    cp ./build/config/htaccess /var/www/html/.htaccess
    cp ./dist/* /var/www/html/ -r
    du -h /var/www/html
else
    echo "Porfavor ejecutame como con permiso de ROOT."
    exit 1
fi