-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: COP4331
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.3

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
-- Table structure for table `Contacts`
--

DROP TABLE IF EXISTS `Contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contacts` (
  `ContactID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `Email` varchar(50) NOT NULL DEFAULT '',
  `Phone` varchar(50) NOT NULL DEFAULT '',
  `Address` varchar(100) NOT NULL DEFAULT '',
  `ZipCode` varchar(25) NOT NULL DEFAULT '',
  `City` varchar(50) NOT NULL DEFAULT '',
  `State` varchar(50) NOT NULL DEFAULT '',
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateLastUpdated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UserID` int NOT NULL,
  PRIMARY KEY (`ContactID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `Contacts_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contacts`
--

LOCK TABLES `Contacts` WRITE;
/*!40000 ALTER TABLE `Contacts` DISABLE KEYS */;
INSERT INTO `Contacts` VALUES (1,'Zac','Kirksey','zkirksey@knights.ucf.edu','765-765-9876','14205 Pegasus Dr','32817','Orlando','FL','2021-01-18 18:31:34','2021-01-18 18:31:34',1);
/*!40000 ALTER TABLE `Contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateLastLoggedIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `Login` varchar(50) NOT NULL DEFAULT '',
  `Password` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'2021-01-16 19:32:54','2021-01-16 19:32:54','Rick','Leinecker','RickL','COP4331'),(2,'2021-01-16 19:48:16','2021-01-16 19:48:16','Rick','Leinecker','RickL','5832a71366768098cceb7095efb774f2'),(3,'2021-01-16 21:39:33','2021-01-16 21:39:33','','','',''),(4,'2021-01-16 21:48:50','2021-01-16 21:48:50','','','',''),(5,'2021-01-16 21:48:58','2021-01-16 21:48:58','','','',''),(6,'2021-01-16 21:50:49','2021-01-16 21:50:49','','','',''),(7,'2021-01-16 21:52:40','2021-01-16 21:52:40','','','',''),(8,'2021-01-16 21:52:49','2021-01-16 21:52:49','','','',''),(9,'2021-01-16 21:52:55','2021-01-16 21:52:55','','','',''),(10,'2021-01-16 21:53:01','2021-01-16 21:53:01','','','',''),(11,'2021-01-16 21:57:18','2021-01-16 21:57:18','dyl','och','kelp','123'),(12,'2021-01-16 21:58:22','2021-01-16 21:58:22','dyl','och','kelp','123'),(13,'2021-01-16 21:58:55','2021-01-16 21:58:55','dyl','och','kelpy','123'),(14,'2021-01-16 22:04:42','2021-01-16 22:04:42','pile','pole','pill','pinder'),(15,'2021-01-16 22:23:22','2021-01-16 22:23:22','hey','hey','hey','hey'),(16,'2021-01-16 22:24:14','2021-01-16 22:24:14','erewr','erwerw','wergsd','sdgsdg'),(17,'2021-01-20 06:57:41','2021-01-20 06:57:41','pp','💩💩','pee','poo'),(18,'2021-01-20 06:59:08','2021-01-20 06:59:08','s','s','s','s'),(19,'2021-01-20 07:00:33','2021-01-20 07:00:33','Sean','Wild','Sean','wild');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-20 21:20:48
