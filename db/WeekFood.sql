-- MySQL dump 10.16  Distrib 10.1.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 192.168.1.10    Database: WeekFood
-- ------------------------------------------------------
-- Server version	10.1.37-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--
drop Database if exists WeekFood;
CREATE Database WeekFood;
use WeekFood;
DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `nombre` varchar(100) NOT NULL,
  `subCategoriaDe` varchar(100) NOT NULL,
  PRIMARY KEY (`nombre`),
  KEY `Categoria-Principal` (`subCategoriaDe`),
  CONSTRAINT `Categoria-Principal` FOREIGN KEY (`subCategoriaDe`) REFERENCES `categoriasprincipales` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES ('Paellas','Arroces'),('Cerdo','Carnes'),('Pollo','Carnes'),('Patatas','Hortalizas'),('Puerros','Hortalizas'),('Tortilla','Huevos'),('Gambas','Marisco'),('Macarrones','Pastas'),('Ensaladas','Verduras'),('Espinacas','Verduras'),('Menestras','Verduras'),('Pimientos','Verduras'),('Pisto','Verduras');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoriasprincipales`
--

DROP TABLE IF EXISTS `categoriasprincipales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoriasprincipales` (
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoriasprincipales`
--

LOCK TABLES `categoriasprincipales` WRITE;
/*!40000 ALTER TABLE `categoriasprincipales` DISABLE KEYS */;
INSERT INTO `categoriasprincipales` VALUES ('Arroces'),('Carnes'),('Hortalizas'),('Huevos'),('Marisco'),('Pastas'),('Verduras');
/*!40000 ALTER TABLE `categoriasprincipales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` varchar(100) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Inicio','portada'),(2,'Productos','productos'),(3,'Alérgenos','alergenos');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(1000) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(1000) NOT NULL DEFAULT 'Un delicioso plato.',
  `foto` varchar(50) NOT NULL DEFAULT '404.png',
  `destacado` tinyint(1) NOT NULL DEFAULT '0',
  `precio` int(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`id`, `categoria`, `nombre`, `descripcion`, `foto`, `destacado`, `precio`) VALUES
	(1, 'Cerdo', 'Lomo asado', 'Lomo de cerdo asado jugoso.', 'lomo-asado.jpg', 1, 1000),
	(2, 'Macarrones', 'Macarrones boloñesa', 'Un delicioso plato.', 'macarrones-boloñesa.jpg', 1, 600),
	(3, 'Paellas,Gambas', 'Paella de marisco', 'Verdadera paella valenciana.', 'paella-marisco.jpg', 1, 800),
	(4, 'Pollo', 'Pechuga a la plancha', 'Plato saludable.', 'pechuga-a-la-plancha.jpg', 1, 500),
	(5, 'Ensaladas,Pollo', 'Ensalada César', 'Excelente ensalada con productos locales.', 'ensalada-cesar.jpg', 1, 700),
	(6, 'Pimientos,Pisto', 'Pimientos rellenos de pisto', 'Preparado al horno.', 'pimientos-pisto.jpg', 0, 400),
	(7, 'Menestras', 'Menestra de verduras', 'Un delicioso plato.', 'menestra-verduras-jamon.jpg', 0, 500),
	(8, 'Tortilla,Patatas', 'Tortilla de patata', 'Un delicioso plato.', 'tortilla-patata.jpg', 0, 550),
	(9, 'Tortilla', 'Tortilla francesa', 'Un delicioso plato.', 'tortilla-francesa.jpg', 0, 350),
	(10, 'Tortilla,Puerros,Espinacas', 'Tortilla de espinacas y puerros', 'Un delicioso plato.', 'tortilla-espinacas-puerros.jpg', 0, 450);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nick` varchar(20) NOT NULL,
  `contraseña` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Esta tabla es dummy';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-12 20:12:50