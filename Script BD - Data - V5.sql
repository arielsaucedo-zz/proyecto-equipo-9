-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema kalitero_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `kalitero_db` ;

-- -----------------------------------------------------
-- Schema kalitero_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kalitero_db` DEFAULT CHARACTER SET utf8 ;
USE `kalitero_db` ;

-- -----------------------------------------------------
-- Table `kalitero_db`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kalitero_db`.`roles` ;

CREATE TABLE IF NOT EXISTS `kalitero_db`.`roles` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kalitero_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kalitero_db`.`users` ;

CREATE TABLE IF NOT EXISTS `kalitero_db`.`users` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `user_name` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `image_avatar` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `role_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_roles1_idx` (`role_id` ASC),
  CONSTRAINT `fk_users_roles1`
    FOREIGN KEY (`role_id`)
    REFERENCES `kalitero_db`.`roles` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kalitero_db`.`shopping_carts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kalitero_db`.`shopping_carts` ;

CREATE TABLE IF NOT EXISTS `kalitero_db`.`shopping_carts` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `total` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `user_id` INT(10) UNSIGNED NOT NULL,
  `order_number` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_shopping_carts_users1_idx` (`user_id` ASC)  ,
  CONSTRAINT `fk_shopping_carts_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `kalitero_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kalitero_db`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kalitero_db`.`categories` ;

CREATE TABLE IF NOT EXISTS `kalitero_db`.`categories` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kalitero_db`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kalitero_db`.`products` ;

CREATE TABLE IF NOT EXISTS `kalitero_db`.`products` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `quantity` BIGINT(20) NOT NULL,
  `price` DECIMAL(10,2) UNSIGNED NOT NULL,
  `discount` TINYINT(3) UNSIGNED NOT NULL DEFAULT 0,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `category_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `category_id`),
  INDEX `fk_products_categories1_idx` (`category_id` ASC)  ,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`category_id`)
    REFERENCES `kalitero_db`.`categories` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kalitero_db`.`cart_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kalitero_db`.`cart_details` ;

CREATE TABLE IF NOT EXISTS `kalitero_db`.`cart_details` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `quantity` INT(10) UNSIGNED NULL DEFAULT NULL,
  `subtotal` DECIMAL(10,2) NULL DEFAULT NULL,
  `shopping_cart_id` INT(10) UNSIGNED NOT NULL,
  `product_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `shopping_cart_id`, `product_id`),
  INDEX `fk_cart_details_shopping_carts1_idx` (`shopping_cart_id` ASC)  ,
  INDEX `fk_cart_details_products1_idx` (`product_id` ASC)  ,
  CONSTRAINT `fk_cart_details_shopping_carts1`
    FOREIGN KEY (`shopping_cart_id`)
    REFERENCES `kalitero_db`.`shopping_carts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_details_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `kalitero_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kalitero_db`.`payment_methods`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kalitero_db`.`payment_methods` ;

CREATE TABLE IF NOT EXISTS `kalitero_db`.`payment_methods` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- DATA INSERTS
-- roles
LOCK TABLES `roles` WRITE;
INSERT INTO `roles` VALUES (1,'user'),(2,'admin');
UNLOCK TABLES;

-- users
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Arnaldo','Akred','aakred0@umn.edu','73c2a2b48f81c8e3e8e44de0fa37564fc8a683d1','http://dummyimage.com/156x229.png/5fa2dd/ffffff','2020-12-02 02:59:59','2020-12-02 02:59:59',1),(2,'Abby','Denham','adenham1@ca.gov','73c2a2b48f81c8e3e8e44de0fa37564fc8a683d1','http://dummyimage.com/126x227.bmp/cc0000/ffffff','2020-12-02 02:59:59','2020-12-02 02:59:59',1),(3,'Gertrudis','Hazelgrove','ghazelgrove2@posterous.com','73c2a2b48f81c8e3e8e44de0fa37564fc8a683d1','http://dummyimage.com/116x215.png/cc0000/ffffff','2020-12-02 02:59:59','2020-12-02 02:59:59',1),(4,'Steffane','Bodill','sbodill3@ustream.tv','73c2a2b48f81c8e3e8e44de0fa37564fc8a683d1','http://dummyimage.com/120x171.png/dddddd/000000','2020-12-02 02:59:59','2020-12-02 02:59:59',1),(5,'Efren','Cherrington','echerrington4@cyberchimps.com','73c2a2b48f81c8e3e8e44de0fa37564fc8a683d1','http://dummyimage.com/116x119.jpg/5fa2dd/ffffff','2020-12-02 02:59:59','2020-12-02 02:59:59',1),(6,'Rani','Pantone','rpantone5@wsj.com','73c2a2b48f81c8e3e8e44de0fa37564fc8a683d1','http://dummyimage.com/177x112.jpg/cc0000/ffffff','2020-12-02 02:59:59','2020-12-02 02:59:59',1),(7,'Jefferey','Gidney','jgidney6@who.int','73c2a2b48f81c8e3e8e44de0fa37564fc8a683d1','http://dummyimage.com/114x132.jpg/dddddd/000000','2020-12-02 02:59:59','2020-12-02 02:59:59',1),(8,'Hadley','Philimore','hphilimore7@bravesites.com','73c2a2b48f81c8e3e8e44de0fa37564fc8a683d1','http://dummyimage.com/178x154.jpg/5fa2dd/ffffff','2020-12-02 02:59:59','2020-12-02 02:59:59',1),(9,'Tamra','MacManus','tmacmanus8@bizjournals.com','73c2a2b48f81c8e3e8e44de0fa37564fc8a683d1','http://dummyimage.com/219x119.png/cc0000/ffffff','2020-12-02 02:59:59','2020-12-02 02:59:59',1),(10,'Wilton','Denney','wdenney9@shinystat.com','73c2a2b48f81c8e3e8e44de0fa37564fc8a683d1','http://dummyimage.com/126x127.bmp/dddddd/000000','2020-12-02 02:59:59','2020-12-02 02:59:59',1),(11,'Cristian','Peralta','cristian.r.peralta@gmail.com','$2a$10$FATuF1SzbpVm7cFIxJqDAOQ619dhg/8Kg.7Gg.KNj8o2t.0hjp0Ga','user_3.jpg','2020-12-02 02:59:59','2020-12-02 02:59:59',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

-- categories
LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Balanzas','2020-06-27 01:36:18','2020-08-06 08:12:52'),(2,'Lectores lineales (codigos de barra)','2020-01-24 08:56:47','2020-09-26 21:25:37'),(3,'Comanderas','2020-09-24 23:48:34','2020-10-11 12:01:25'),(4,'Computadoras','2020-03-07 21:56:37','2020-07-03 20:41:17'),(5,'Monitores','2020-04-03 01:18:37','2020-12-05 21:56:33'),(6,'Lectores 2D (codigos QR)','2020-02-27 01:41:26','2020-02-06 03:00:44'),(7,'Combos','2020-04-07 13:21:20','2020-01-07 17:23:58');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

-- products
LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Balanza Kretz Report TCP-IP','Balanza con conexion por red','2020-09-15 09:42:44','2020-06-08 00:24:31',1,99000,10,'balanza-tcp-ip-kretz.png',1),(2,'Balanza Kretz Report LT','Balanza con conexion por USB','2020-02-11 13:54:53','2020-02-10 12:36:12',1,66000,5,'balanza-report-lt-kretz.jpg',1),(3,'Lector lineal Kretz OPR-3201','Lector de mano para codigos de barra lineales marca Kretz','2020-02-13 06:01:51','2020-02-05 09:45:41',1,9000,0,'lector-opr-kretz.png',2),(4,'Lector lineal 3nSTAR SC100-1','Lector de mano para codigos de barra lineales marca 3nSTAR','2020-02-18 07:31:06','2020-09-11 04:09:01',1,8000,20,'lector-3nstar.png',2),(5,'Lector 2D Honeywell 7980g','Lector de mesa para codigos lineales y QR marca Honeywell','2020-10-05 23:42:11','2020-11-23 22:15:25',1,25000,0,'lector-2d-honeywell.png',6),(6,'Monitor de PC 19"','Monitor de 19" para computadora de escritorio','2020-06-27 15:04:09','2020-06-11 08:49:40',1,15000,0,'monitor.png',5),(7,'PC i3 4GB 1TB','Computadora de escritorio con procesador Intel Core i3, 4 GB de RAM y 1 TB de almacenamiento','2020-02-21 01:04:10','2020-07-17 11:30:59',1,35000,0,'PC-i3.png',4),(8,'Comandera Kretz Lexa','Impresora de tickets y comandas a rollo termico de 80mm Kretz Lexa','2020-09-13 06:52:36','2020-11-24 08:24:41',1,15000,0,'impresora-lexa-kretz.png',3),(9,'Comandera 3nSTAR RPT-600','Impresora de tickets y comandas a rollo termico de 80mm 3nSTAR RPT-600','2020-01-31 10:34:29','2020-07-24 01:38:16',1,12500,0,'impresora-3nstar.png',3),(10,'Combo 1','Combo PC i3 4GB 1TB + Monitor 19" + Balanza Kretz Report TCP-IP + Comandera Kretz Lexa + Lector de codigos QR Honeywell','2020-03-09 06:58:54','2020-05-05 02:30:21',1,140000,0,'combo1.jpeg',7);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

-- payment_methods
LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'Efectivo'),(2,'Tarjeta de crédito'),(3,'Tarjeta de débito'),(4,'Transferencia Bancaria');
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

-- shopping_carts
-- cart_details