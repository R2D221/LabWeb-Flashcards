# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.24)
# Database: FlashCards
# Generation Time: 2015-10-09 22:03:58 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Alumno
# ------------------------------------------------------------

CREATE TABLE `Alumno` (
  `id_alumno` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `logros` varchar(300) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table alumno_pregunta
# ------------------------------------------------------------

CREATE TABLE `alumno_pregunta` (
  `id_alumno` int(11) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `respuesta` varchar(50) NOT NULL,
  KEY `id_alumno` (`id_alumno`),
  KEY `id_pregunta` (`id_pregunta`),
  CONSTRAINT `alumno_pregunta_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `Alumno` (`id_alumno`),
  CONSTRAINT `alumno_pregunta_ibfk_2` FOREIGN KEY (`id_pregunta`) REFERENCES `Pregunta` (`id_pregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Grupo
# ------------------------------------------------------------

CREATE TABLE `Grupo` (
  `id_grupo` int(11) NOT NULL AUTO_INCREMENT,
  `id_profesor` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `clave_acceso` varchar(50) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  PRIMARY KEY (`id_grupo`),
  KEY `id_profesro` (`id_profesor`),
  CONSTRAINT `grupo_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `Profesor` (`id_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Grupo_alumno
# ------------------------------------------------------------

CREATE TABLE `Grupo_alumno` (
  `id_grupo` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  KEY `id_grupo` (`id_grupo`),
  KEY `id_alumno` (`id_alumno`),
  CONSTRAINT `grupo_alumno_ibfk_1` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo` (`id_grupo`),
  CONSTRAINT `grupo_alumno_ibfk_2` FOREIGN KEY (`id_alumno`) REFERENCES `Alumno` (`id_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Pregunta
# ------------------------------------------------------------

CREATE TABLE `Pregunta` (
  `id_pregunta` int(11) NOT NULL AUTO_INCREMENT,
  `id_grupo` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `opciones` varchar(200) NOT NULL,
  `respuesta` varchar(50) NOT NULL,
  PRIMARY KEY (`id_pregunta`),
  KEY `id_grupo` (`id_grupo`),
  CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo` (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Profesor
# ------------------------------------------------------------

CREATE TABLE `Profesor` (
  `id_profesor` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `nombre` int(11) NOT NULL,
  `contrasena` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`id_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Referencias
# ------------------------------------------------------------

CREATE TABLE `Referencias` (
  `id_referencia` int(11) NOT NULL AUTO_INCREMENT,
  `id_grupo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `archivo` varchar(100) NOT NULL,
  `disponibilidad` tinyint(1) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  PRIMARY KEY (`id_referencia`),
  KEY `id_grupo` (`id_grupo`),
  CONSTRAINT `referencias_ibfk_1` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo` (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
