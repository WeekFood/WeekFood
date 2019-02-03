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

-- Volcando datos para la tabla weekfood.articulosencarritos: ~0 rows (aproximadamente)
DELETE FROM `articulosencarritos`;
/*!40000 ALTER TABLE `articulosencarritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `articulosencarritos` ENABLE KEYS */;

-- Volcando datos para la tabla weekfood.carritos: ~0 rows (aproximadamente)
DELETE FROM `carritos`;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;

-- Volcando datos para la tabla weekfood.categorias: ~13 rows (aproximadamente)
DELETE FROM `categorias`;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` (`nombre`, `subCategoriaDe`) VALUES
	('Paellas', 'Arroces'),
	('Cerdo', 'Carnes'),
	('Pollo', 'Carnes'),
	('Patatas', 'Hortalizas'),
	('Puerros', 'Hortalizas'),
	('Tortilla', 'Huevos'),
	('Gambas', 'Marisco'),
	('Macarrones', 'Pastas'),
	('Ensaladas', 'Verduras'),
	('Espinacas', 'Verduras'),
	('Menestras', 'Verduras'),
	('Pimientos', 'Verduras'),
	('Pisto', 'Verduras');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;

-- Volcando datos para la tabla weekfood.categoriasprincipales: ~7 rows (aproximadamente)
DELETE FROM `categoriasprincipales`;
/*!40000 ALTER TABLE `categoriasprincipales` DISABLE KEYS */;
INSERT INTO `categoriasprincipales` (`nombre`) VALUES
	('Arroces'),
	('Carnes'),
	('Hortalizas'),
	('Huevos'),
	('Marisco'),
	('Pastas'),
	('Verduras');
/*!40000 ALTER TABLE `categoriasprincipales` ENABLE KEYS */;

-- Volcando datos para la tabla weekfood.menu: ~3 rows (aproximadamente)
DELETE FROM `menu`;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` (`id`, `valor`, `direccion`) VALUES
	(1, 'Inicio', 'portada'),
	(2, 'Productos', 'productos'),
	(3, 'Quiénes somos', 'quienesSomos');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;

-- Volcando datos para la tabla weekfood.metodospago: ~0 rows (aproximadamente)
DELETE FROM `metodospago`;
/*!40000 ALTER TABLE `metodospago` DISABLE KEYS */;
/*!40000 ALTER TABLE `metodospago` ENABLE KEYS */;

-- Volcando datos para la tabla weekfood.nivelesprivilegio: ~2 rows (aproximadamente)
DELETE FROM `nivelesprivilegio`;
/*!40000 ALTER TABLE `nivelesprivilegio` DISABLE KEYS */;
INSERT INTO `nivelesprivilegio` (`id`, `nombre`) VALUES
	(0, 'Administrador General'),
	(9, 'Usuario Basico');
/*!40000 ALTER TABLE `nivelesprivilegio` ENABLE KEYS */;

-- Volcando datos para la tabla weekfood.pedidos: ~0 rows (aproximadamente)
DELETE FROM `pedidos`;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;

-- Volcando datos para la tabla weekfood.productos: ~10 rows (aproximadamente)
DELETE FROM `productos`;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`id`, `categoria`, `nombre`, `descripcion`, `foto`, `destacado`, `precio`) VALUES
	(1, 'Cerdo', 'Lomo asado', 'Lomo de cerdo asado jugoso', 'lomo-asado.jpg', 1, 1000),
	(2, 'Macarrones', 'Macarrones boloñesa', 'Un clásico de la cocina italiana', 'macarrones-boloñesa.jpg', 1, 600),
	(3, 'Paellas,Gambas', 'Paella de marisco', 'Verdadera paella valenciana', 'paella-marisco.jpg', 1, 800),
	(4, 'Pollo', 'Pechuga a la plancha', 'Exquisita pechuga de pollo a la plancha', 'pechuga-a-la-plancha.jpg', 1, 500),
	(5, 'Ensaladas,Pollo', 'Ensalada César', 'Excelente ensalada con productos locales', 'ensalada-cesar.jpg', 1, 700),
	(6, 'Pimientos,Pisto', 'Pimientos rellenos', 'Una receta muy mediterránea, sin gluten y llena de sabor', 'pimientos-pisto.jpg', 0, 400),
	(7, 'Menestras', 'Menestra de verduras', 'Guisado compuesto con diferentes hortalizas y con trozos pequeños de carne o jamón', 'menestra-verduras-jamon.jpg', 0, 500),
	(8, 'Tortilla,Patatas', 'Tortilla de patata', 'Tortilla muy sabrosa con cebolla', 'tortilla-patata.jpg', 0, 550),
	(9, 'Tortilla', 'Tortilla francesa', 'Hecha con huevos seleccionados y con aceite de oliva', 'tortilla-francesa.jpg', 0, 350),
	(10, 'Tortilla,Puerros,Espinacas', 'Tortilla de espinacas y puerros', 'Tortilla deliciosa y con muchos nutrientes', 'tortilla-espinacas-puerros.jpg', 0, 450);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

-- Volcando datos para la tabla weekfood.tiposmetodospago: ~0 rows (aproximadamente)
DELETE FROM `tiposmetodospago`;
/*!40000 ALTER TABLE `tiposmetodospago` DISABLE KEYS */;
/*!40000 ALTER TABLE `tiposmetodospago` ENABLE KEYS */;

-- Volcando datos para la tabla weekfood.ubicaciones: ~0 rows (aproximadamente)
DELETE FROM `ubicaciones`;
/*!40000 ALTER TABLE `ubicaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `ubicaciones` ENABLE KEYS */;

-- Volcando datos para la tabla weekfood.usuarios: ~0 rows (aproximadamente)
DELETE FROM `usuarios`;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
