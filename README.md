# WeekFood
Proyecto WeekFood para 2º curso de Desarrollo de Aplicaciones Web.

Recomendamos la lectura de este documento.

### Datos a tener en cuenta
- El proyecto está dividido en 2 partes yuxtapuestas en una sola raíz.
- La parte de cliente y la API REST están en ./src.
- La parte de administración está aislada en ./admin.
- Al hacer despliegue en Local/Producción, se juntan en una sola raíz y comparten recursos.

```
./admin   - Administración 
./build   - Cosas de despliegue y configuración
./db      - Base de datos
./src     - Cliente
```

## Requisitos
* PHP 7.2
* MariaDB 10.3
* Node.js v8.12.0+

## Instalar base de datos

Ejecutar en orden los scripts:
- db/WeekFood_creacion.sql
- db/WeekFood_datos.sql
- db/WeekFood_usuario.sql

## Instalar dependencias
```
npm install
```
## Instalar dependencias administración
```
cd ./admin
npm install
```

## Iniciar entorno de desarrollo
_en terminales separados_
```
npm run server
```
```
npm run cliente
```
```
npm run admin
```

## Construir dist/
_(ejecutar desde Git Bash o bash nativo)_
```
npm run build
```
## Comandos de despliegue
- Máquina local : ``` npm run buildDeployLocal ``` (no funcionan las imágenes de los usuarios)
- Produccion : ``` npm run buildDeployProd ```

## Credenciales
El usuario administrador por defecto es ` Admin ` contraseña ` mergemaster `
