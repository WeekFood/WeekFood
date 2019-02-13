-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.1.37-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para weekfood
DROP DATABASE IF EXISTS `weekfood`;
CREATE DATABASE IF NOT EXISTS `weekfood` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `weekfood`;

-- Volcando estructura para tabla weekfood.articulosencarritos
DROP TABLE IF EXISTS `articulosencarritos`;
CREATE TABLE IF NOT EXISTS `articulosencarritos` (
  `idCarrito` int(11) NOT NULL,
  `idArticulo` int(11) NOT NULL,
  `cantidad` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idCarrito`,`idArticulo`),
  KEY `carritos_id_FK` (`idCarrito`),
  KEY `productos_id_FK` (`idArticulo`),
  CONSTRAINT `carritos_id_FK` FOREIGN KEY (`idCarrito`) REFERENCES `carritos` (`id`),
  CONSTRAINT `productos_id_FK` FOREIGN KEY (`idArticulo`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla weekfood.carritos
DROP TABLE IF EXISTS `carritos`;
CREATE TABLE IF NOT EXISTS `carritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `carritos_usuarios_FK` (`idUsuario`),
  CONSTRAINT `carritos_usuarios_FK` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla weekfood.categorias
DROP TABLE IF EXISTS `categorias`;
CREATE TABLE IF NOT EXISTS `categorias` (
  `nombre` varchar(100) NOT NULL,
  `subCategoriaDe` varchar(100) NOT NULL,
  PRIMARY KEY (`nombre`),
  KEY `Categoria-Principal` (`subCategoriaDe`),
  CONSTRAINT `Categoria-Principal` FOREIGN KEY (`subCategoriaDe`) REFERENCES `categoriasprincipales` (`nombre`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla weekfood.categoriasprincipales
DROP TABLE IF EXISTS `categoriasprincipales`;
CREATE TABLE IF NOT EXISTS `categoriasprincipales` (
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla weekfood.menu
DROP TABLE IF EXISTS `menu`;
CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` varchar(100) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla weekfood.metodospago
DROP TABLE IF EXISTS `metodospago`;
CREATE TABLE IF NOT EXISTS `metodospago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipometodopago` varchar(50) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `titular` varchar(100) DEFAULT NULL,
  `numero` int(16) DEFAULT NULL,
  `mescaducidad` int(2) DEFAULT NULL,
  `añocaducidad` int(4) DEFAULT NULL,
  `cvc2` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipoMetodoPago` (`tipometodopago`),
  KEY `metodos_usuario` (`idusuario`),
  CONSTRAINT `metodos_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `tipoMetodoPago` FOREIGN KEY (`tipometodopago`) REFERENCES `tiposmetodospago` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla weekfood.nivelesprivilegio
DROP TABLE IF EXISTS `nivelesprivilegio`;
CREATE TABLE IF NOT EXISTS `nivelesprivilegio` (
  `id` int(1) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla weekfood.pedidos
DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idcarrito` int(11) NOT NULL,
  `fechacompra` datetime NOT NULL,
  `fechaentrega` datetime NOT NULL,
  `idubicacion` int(11) NOT NULL,
  `idmetodopago` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCarrito` (`idcarrito`),
  KEY `idUbicacion` (`idubicacion`),
  KEY `idMetodoPago` (`idmetodopago`),
  CONSTRAINT `idCarrito` FOREIGN KEY (`idcarrito`) REFERENCES `carritos` (`id`),
  CONSTRAINT `idMetodoPago` FOREIGN KEY (`idmetodopago`) REFERENCES `metodospago` (`id`),
  CONSTRAINT `idUbicacion` FOREIGN KEY (`idubicacion`) REFERENCES `ubicaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla weekfood.productos
DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(1000) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(1000) NOT NULL DEFAULT 'Un delicioso plato.',
  `foto` varchar(50) NOT NULL DEFAULT '404.png',
  `destacado` tinyint(1) NOT NULL DEFAULT '0',
  `precio` int(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla weekfood.tiposmetodospago
DROP TABLE IF EXISTS `tiposmetodospago`;
CREATE TABLE IF NOT EXISTS `tiposmetodospago` (
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla weekfood.ubicaciones
DROP TABLE IF EXISTS `ubicaciones`;
CREATE TABLE IF NOT EXISTS `ubicaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `municipio` varchar(100) NOT NULL,
  `codigopostal` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUsuario` (`idusuario`),
  CONSTRAINT `idUsuario` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla weekfood.usuarios
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nick` varchar(100) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `telefono` varchar(13) DEFAULT NULL,
  `nacimiento` date DEFAULT NULL,
  `nivelprivilegio` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nick` (`nick`),
  KEY `nivelprivilegio` (`nivelprivilegio`),
  CONSTRAINT `nivelprivilegio` FOREIGN KEY (`nivelprivilegio`) REFERENCES `nivelesprivilegio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
