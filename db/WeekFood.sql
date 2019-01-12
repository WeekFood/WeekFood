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
-- Current Database: `WeekFood`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `weekfood` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `WeekFood`;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `nombre` varchar(100) NOT NULL,
  `subCategoriaDe` varchar(100) NOT NULL,
  PRIMARY KEY (`nombre`),
  KEY `Categoria-Principal` (`subCategoriaDe`),
  CONSTRAINT `Categoria-Principal` FOREIGN KEY (`subCategoriaDe`) REFERENCES `categorias-principales` (`nombre`)
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
-- Table structure for table `categorias-principales`
--

DROP TABLE IF EXISTS `categorias-principales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias-principales` (
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias-principales`
--

LOCK TABLES `categorias-principales` WRITE;
/*!40000 ALTER TABLE `categorias-principales` DISABLE KEYS */;
INSERT INTO `categorias-principales` VALUES ('Arroces'),('Carnes'),('Hortalizas'),('Huevos'),('Marisco'),('Pastas'),('Verduras');
/*!40000 ALTER TABLE `categorias-principales` ENABLE KEYS */;
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
INSERT INTO `menu` VALUES (1,'Inicio','portada'),(2,'Productos','productos'),(3,'Ofertas Destacadas','ofertas'),(4,'Alérgenos','alergenos');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (2,'Cerdo','Lomo asado','Un delicioso plato.','lomo-asado.jpg',1),(3,'Macarrones','Macarrones boloñesa','Un delicioso plato.','macarrones-boloñesa.jpg',0),(4,'Paellas,Gambas','Paella de marisco','Un delicioso plato.','paella-marisco.jpg',0),(5,'Pollo','Pechuga a la plancha','Un delicioso plato.','pechuga-a-la-plancha.jpg',0),(6,'Ensaladas,Pollo','Ensalada césar','Un delicioso plato.','ensalada-cesar.jpg',0),(7,'Pimientos,Pisto','Pimientos rellenos de pisto','Un delicioso plato.','pimientos-pisto.jpg',0),(8,'Menestras','Menestra de verduras','Un delicioso plato.','menestra-verduras-jamon.jpg',0),(9,'Tortilla,Patatas','Tortilla de patata','Un delicioso plato.','tortilla-patata.jpg',0),(10,'Tortilla','Tortilla francesa','Un delicioso plato.','tortilla-francesa.jpg',0),(11,'Tortilla,Puerros,Espinacas','Tortilla de espinacas y puerros','Un delicioso plato.','tortilla-espinacas-puerros.jpg',0);
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

-- Dump completed on 2019-01-12 19:06:59
