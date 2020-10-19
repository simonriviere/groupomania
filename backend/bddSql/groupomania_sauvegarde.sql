-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Articles`
--

DROP TABLE IF EXISTS `Articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(250) NOT NULL,
  `message` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image` varchar(250) NOT NULL,
  `userId` int NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateModification` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `titre` (`titre`),
  KEY `useId` (`userId`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Articles`
--

LOCK TABLES `Articles` WRITE;
/*!40000 ALTER TABLE `Articles` DISABLE KEYS */;
INSERT INTO `Articles` VALUES (8,'Un article avec user2','le  texte du commentaire','rouge.jpg',35,'2020-10-19 12:08:31',NULL);
/*!40000 ALTER TABLE `Articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Commentaire`
--

DROP TABLE IF EXISTS `Commentaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Commentaire` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `likeArticle` int DEFAULT NULL,
  `dislikeArticle` int DEFAULT NULL,
  `articleId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comId` (`articleId`),
  KEY `fk_useId` (`userId`),
  CONSTRAINT `fk_comId` FOREIGN KEY (`articleId`) REFERENCES `Articles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_useId` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Commentaire`
--

LOCK TABLES `Commentaire` WRITE;
/*!40000 ALTER TABLE `Commentaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `Commentaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) DEFAULT NULL,
  `prenom` varchar(250) DEFAULT NULL,
  `sexe` char(1) DEFAULT 'h',
  `pseudo` varchar(250) DEFAULT NULL,
  `imageProfil` varchar(250) DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ind_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (17,NULL,NULL,'h',NULL,NULL,'rivmon@me.com','$2b$10$YfEr1xXLdC.65DHZdpGeKOu5VzeSCwcnxMaUJbMq8mh3ksomRkRB2'),(24,NULL,NULL,'h',NULL,NULL,'riviere.simon@me.com','$2b$10$QZTmAa8ACPfYaFLvIUc87.zQ4I9N8iqz8XjK0drs1uRn/r5M/ZVni'),(25,NULL,NULL,'h',NULL,NULL,'','$2b$10$RagA0PLAEFDxQdSrX4BMsurOmgxpf/VIA4dsCrNgOZ3y41Wq1oYJG'),(28,NULL,NULL,'h',NULL,NULL,'on@me.com','$2b$10$w1TgnI6m8YRG68WFfmehf.GsWx3E7s8vT3FOBblipTK8edL/XvL9u'),(29,NULL,NULL,'h',NULL,NULL,'jacque@lol.fr','$2b$10$6GMQkUk8cVwAxfeWEh/m6.e0aACuXHg06/hU4LiBd5pJSS9wd08IG'),(33,NULL,NULL,'h',NULL,NULL,'n@me.com','$2b$10$rSxjjMXAAmjIAaRBHqZD9ecB5ptUs8dxOqchv8.pt10QWHsivAAmC'),(35,NULL,NULL,'h',NULL,NULL,'riv.sim31@gmail.com','$2b$10$rw9h3wdVeBzf2uNulSnTa.6m0SAc0Fk678sEhu86jti4ZOzEm7gsO'),(36,NULL,NULL,'h',NULL,NULL,'riviere.simon@me.fr','$2b$10$bgnJ2yE65vyORo.8Az58JeyEVaiW4D/kJ/eelAlhxVMj/aWQ5O7ba'),(40,NULL,NULL,'h',NULL,NULL,'ron@me.fr','$2b$10$fBS196Zz.FLKyTrUrlDjmeq70PP5w3uoXBXhGravlawhkHMZvtRiG'),(42,NULL,NULL,'h',NULL,NULL,'fz@e.fr','$2b$10$l7tc0uyv6Fh9ydTC9V0o4uuhPW8LeehEyEHGygZUIDw1lcac40WV2'),(43,NULL,NULL,'h',NULL,NULL,'f@e.fr','$2b$10$Z2HKYum2h9DqDvrtVlicouUUNAkhsaE9ZwKBXNcku83mYvhdyTrku');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-19 22:41:15
