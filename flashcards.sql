-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: localhost    Database: flashcards
-- ------------------------------------------------------
-- Server version	5.6.17-enterprise-commercial-advanced-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administrador` (
  `idadministrador` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(25) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`idadministrador`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,'admin','daVinci1');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumno` (
  `id_alumno` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(30) NOT NULL,
  `logros` varchar(300) DEFAULT '',
  PRIMARY KEY (`id_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES (3,'Equipo 1','equipo1@labweb.com','Equipo 1','uno',''),(4,'Equipo 2','equipo2@labweb.com','Equipo 2','dos',''),(5,'Equipo 3','eruipo3@labweb.com','Equipo 3 ','tres',''),(6,'Equipo 4','equipo4@labweb.com','Equipo 4','cuatro',''),(7,'Equipo 5','equipo5@labweb.com','Equipo 5','cinco',''),(8,'Equipo 6','equipo6@labweb.com','Equipo 6','seis','');
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumno_pregunta`
--

DROP TABLE IF EXISTS `alumno_pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumno_pregunta` (
  `id_alumno` int(11) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `respuesta` varchar(50) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  KEY `id_alumno` (`id_alumno`),
  KEY `id_pregunta` (`id_pregunta`),
  CONSTRAINT `alumno_pregunta_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`),
  CONSTRAINT `alumno_pregunta_ibfk_2` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id_pregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno_pregunta`
--

LOCK TABLES `alumno_pregunta` WRITE;
/*!40000 ALTER TABLE `alumno_pregunta` DISABLE KEYS */;
INSERT INTO `alumno_pregunta` VALUES (3,18,'2',7),(3,14,'2',7),(3,17,'3',7),(3,15,'4',7),(3,16,'1',7),(4,14,'1',7),(4,17,'2',7),(4,15,'3',7),(4,18,'4',7),(4,16,'1',7),(5,16,'1',7),(5,17,'2',7),(5,14,'3',7),(5,15,'4',7),(5,18,'1',7),(6,16,'1',7),(6,15,'2',7),(6,18,'3',7),(6,17,'4',7),(6,14,'1',7);
/*!40000 ALTER TABLE `alumno_pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadisticas_grupo`
--

DROP TABLE IF EXISTS `estadisticas_grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estadisticas_grupo` (
  `id_pregunta` int(11) NOT NULL,
  `respuesta` int(11) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  `conteo` int(11) DEFAULT '0',
  PRIMARY KEY (`id_pregunta`,`respuesta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadisticas_grupo`
--

LOCK TABLES `estadisticas_grupo` WRITE;
/*!40000 ALTER TABLE `estadisticas_grupo` DISABLE KEYS */;
INSERT INTO `estadisticas_grupo` VALUES (14,1,7,2),(14,2,7,1),(14,3,7,1),(14,4,7,0),(15,1,7,0),(15,2,7,1),(15,3,7,1),(15,4,7,2),(16,1,7,4),(16,2,7,0),(16,3,7,0),(16,4,7,0),(17,1,7,0),(17,2,7,2),(17,3,7,1),(17,4,7,1),(18,1,7,1),(18,2,7,1),(18,3,7,1),(18,4,7,1),(24,1,10,0),(24,2,10,0),(24,3,10,0),(24,4,10,0),(25,1,10,0),(25,2,10,0),(25,3,10,0),(25,4,10,0);
/*!40000 ALTER TABLE `estadisticas_grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo`
--

DROP TABLE IF EXISTS `grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupo` (
  `id_grupo` int(11) NOT NULL AUTO_INCREMENT,
  `id_profesor` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `clave_acceso` varchar(50) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  PRIMARY KEY (`id_grupo`),
  KEY `id_profesro` (`id_profesor`),
  CONSTRAINT `grupo_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id_profesor`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo`
--

LOCK TABLES `grupo` WRITE;
/*!40000 ALTER TABLE `grupo` DISABLE KEYS */;
INSERT INTO `grupo` VALUES (7,23,'Pruebas Flashcards','Grupo de Prueba','prueba','2015-10-30','2015-11-30'),(10,23,'Grupo Prueba 3','Por favor, sirve','desesperado','2015-11-07','2015-11-14');
/*!40000 ALTER TABLE `grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo_alumno`
--

DROP TABLE IF EXISTS `grupo_alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupo_alumno` (
  `id_grupo` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  KEY `id_grupo` (`id_grupo`),
  KEY `id_alumno` (`id_alumno`),
  CONSTRAINT `grupo_alumno_ibfk_1` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id_grupo`),
  CONSTRAINT `grupo_alumno_ibfk_2` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo_alumno`
--

LOCK TABLES `grupo_alumno` WRITE;
/*!40000 ALTER TABLE `grupo_alumno` DISABLE KEYS */;
INSERT INTO `grupo_alumno` VALUES (7,3),(7,4),(7,5),(7,6),(7,7),(7,8),(7,3),(7,4),(7,5),(7,6),(7,7),(7,8);
/*!40000 ALTER TABLE `grupo_alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pregunta` (
  `id_pregunta` int(11) NOT NULL AUTO_INCREMENT,
  `id_grupo` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `A` varchar(200) NOT NULL,
  `B` varchar(200) NOT NULL,
  `C` varchar(200) NOT NULL,
  `D` varchar(200) NOT NULL,
  `respuesta` varchar(10) NOT NULL,
  PRIMARY KEY (`id_pregunta`),
  KEY `id_grupo` (`id_grupo`),
  CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id_grupo`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (14,7,'Que es HTTP?','Lab Web','Nada','Un protocolo','Una persona','Un pastel','2'),(15,7,'Como se llama este proyecto?','Lab Web','Cerebraton','##','Flashcards','Black Board 2','1'),(16,7,'Como se llama la maestra?','Lab Web','Fernanda','Maria','Anita','Roberta','1'),(17,7,'A que hora comienza la clase?','Lab Web','5:00','2:30','4:00','Cual clase','3'),(18,7,'Cuantas sillas hay en el salon?','Lab Web','31','Muchas','32','30','1'),(24,10,'124','Matematicas','5','6','7','8','4'),(25,10,'Si','Logica','No','No','No','NO','4');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profesor` (
  `id_profesor` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `contrasena` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_profesor`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` VALUES (1,'Chuu','Jesus Herrera','pass'),(2,'Sue','Susana Gonzalez','bob'),(3,'Jorgito','Jorge Torres','Cantucky4Life'),(4,'R2D221','Arturo Torres','hola'),(5,'cantucky','Daniel Canto','pass'),(6,'chimi','Sebastian Chimal','chims'),(7,'bebeChola','Ulises Torner','cholita'),(8,'andie','Andres Sedano','ranfom'),(9,'sHerrera','Sergio Herrera','pass'),(10,'bob','Bob Perez','pass'),(11,'Conaletty','Lila Downs','oaxaca'),(12,'tron','Zdenek Tronicek','pass'),(13,'Infiernanda','Fernanda Montiel','pass'),(14,'LorRulez','Lorena Velazquez','pass'),(15,'dieguin','Diego Cabrera','hola'),(16,'kSoria','Karina Soria','stuff'),(17,'Elio','Elio Pez','pez'),(18,'sergio','Sergio Enrique Herrera','pass'),(19,'Infier','Fer M','pass'),(22,'fer','fer','fer'),(23,'Infiernanda','Fernanda','Infiernanda');
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `referencias`
--

DROP TABLE IF EXISTS `referencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `referencias` (
  `id_referencia` int(11) NOT NULL AUTO_INCREMENT,
  `id_grupo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `archivo` varchar(100) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  PRIMARY KEY (`id_referencia`),
  KEY `id_grupo` (`id_grupo`),
  CONSTRAINT `referencias_ibfk_1` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id_grupo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referencias`
--

LOCK TABLES `referencias` WRITE;
/*!40000 ALTER TABLE `referencias` DISABLE KEYS */;
INSERT INTO `referencias` VALUES (5,7,'Guia','Temas, muchos temas','uploads/1446232433041S12015-13_HTTP_CS.pdf','2015-10-30','2015-11-14'),(6,7,'Nuevo','Blah','uploads/144624542848615 - 1.jpg','2015-10-30','2015-10-31');
/*!40000 ALTER TABLE `referencias` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-10 16:44:28
