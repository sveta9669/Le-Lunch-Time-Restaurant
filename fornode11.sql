/*
Navicat MySQL Data Transfer

Source Server         : db
Source Server Version : 100427
Source Host           : localhost:3306
Source Database       : fornode11

Target Server Type    : MYSQL
Target Server Version : 100427
File Encoding         : 65001

Date: 2023-06-01 09:52:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cards
-- ----------------------------
DROP TABLE IF EXISTS `cards`;
CREATE TABLE `cards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `count` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `foodId` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `foodId` (`foodId`),
  CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `cards_ibfk_2` FOREIGN KEY (`foodId`) REFERENCES `food` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of cards
-- ----------------------------
INSERT INTO `cards` VALUES ('1', '2', '18000', '3', '3', null, null);
INSERT INTO `cards` VALUES ('2', '3', '4500', '3', '23', null, null);
INSERT INTO `cards` VALUES ('3', '2', '5000', '3', '10', '2023-06-01 04:23:02', '2023-06-01 04:23:02');

-- ----------------------------
-- Table structure for feedbacks
-- ----------------------------
DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` varchar(300) DEFAULT '',
  `createdAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of feedbacks
-- ----------------------------
INSERT INTO `feedbacks` VALUES ('1', 'Sveta', 'Ghazaryan', 'svetakazaryan96@gmail.com', 'Honestly, I\'m not an expert in food and flavors, so I think I didn\'t have a bad meal before. Maybe It just once with truffle egg which was horrible and disappointing and because of this order I will never try truffle anymore.\r\n\r\n\r\n', '2023-05-31 10:59:57', '2023-05-31 10:59:57', 'true');
INSERT INTO `feedbacks` VALUES ('2', 'Hovhannes', 'Atabekyan', 'hov.ata@mail.ru', 'I had dinner with my family at the central city restaurant many years ago. The restaurant welcomed us with warm and friendly. The mains was good with all of meals we love. We enjoyed the food until we found the chicken still red inside. It wasn\'t cook eno', '2023-05-31 11:00:10', '2023-05-31 11:00:10', 'true');
INSERT INTO `feedbacks` VALUES ('3', 'Karen', 'Sahakyan', 'karo1234@mail.ru', 'I loved the food, the service was great, the dishes were just delicious, I\'ll recommend it.\r\n\r\n', '2023-05-31 11:00:07', '2023-05-31 11:00:07', 'true');
INSERT INTO `feedbacks` VALUES ('4', 'Mane', 'Mkrtchyan', 'manejan@hotmail.ru', 'Hands down the best chicken wings I have ever eaten. My partner and I were visiting some friends in the area and these heavenly wings were the only thing requested. The wings themselves had great flavor and AMAZING crunch. But really, I think the crispin', '2023-05-31 11:00:14', '2023-05-31 11:00:14', 'false');
INSERT INTO `feedbacks` VALUES ('5', 'Anahit', 'Karoyan', 'an.karoyan@mail.ru', 'I went with my colleague there last Friday, they welcomed us and found us a good table which had a view to the kitchen for seeing the chiefs while working in.\r\nAs a side menu they brought us a season salat, a green salad and yogurt that they famous for.', '2023-05-31 11:00:11', '2023-05-31 11:00:11', 'true');

-- ----------------------------
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of food
-- ----------------------------
INSERT INTO `food` VALUES ('1', 'Beef Tzhvzhik.jpg', 'Beeg Tzhvzhik', '2100', 'Dishes', null, null);
INSERT INTO `food` VALUES ('2', 'Beefstroganoff.jpg', 'Beefstroganoff', '3300', 'Dishes', null, null);
INSERT INTO `food` VALUES ('3', 'Chakhokhbili with Hare.jpg', 'Chakhokhbili with Hare', '9000', 'Dishes', null, null);
INSERT INTO `food` VALUES ('4', 'Chakhokhbili with Rooster.jpg', 'Chakhokhbili with Rooster', '9800', 'Dishes', '2023-05-31 12:54:29', '2023-05-31 12:54:29');
INSERT INTO `food` VALUES ('5', 'Chef Languette.jpg', 'Chef Languette', '4500', 'Dishes', null, null);
INSERT INTO `food` VALUES ('6', 'Chicken Wings with Sauce.jpg', 'Chicken Wings with Sauce', '2000', 'Dishes', null, null);
INSERT INTO `food` VALUES ('7', 'Fried Baby Chicken.jpg', 'Fried Baby Chicken', '2200', 'Dishes', null, null);
INSERT INTO `food` VALUES ('8', 'Italian Beef.jpg', 'Italian Beef', '4400', 'Dishes', null, null);
INSERT INTO `food` VALUES ('9', 'Medallion.jpg', 'Medallion', '3100', 'Dishes', null, null);
INSERT INTO `food` VALUES ('10', 'Pork roast with vegetables.jpg', 'Pork roast with vegetables', '2500', 'Dishes', null, null);
INSERT INTO `food` VALUES ('11', 'Roast.jpg', 'Roast', '2300', 'Dishes', null, null);
INSERT INTO `food` VALUES ('12', 'Rooster with Pilaf.jpg', 'Rooster with Pilaf', '9500', 'Dishes', null, null);
INSERT INTO `food` VALUES ('13', 'Summer Style Lamb.jpg', 'Summer Style Lamb', '4000', 'Dishes', null, null);
INSERT INTO `food` VALUES ('14', 'Veal Khashlama A new recipe.jpg', 'Veal Khashlama A new recipe', '3500', 'Dishes', null, null);
INSERT INTO `food` VALUES ('15', 'Veal Shoulder with Emmer Pilaff.jpg', 'Veal Shoulder with Emmer Pilaff', '7000', 'Dishes', null, null);
INSERT INTO `food` VALUES ('16', 'Caesar.jpg', 'Caesar', '2500', 'Salads', null, null);
INSERT INTO `food` VALUES ('17', 'Tabouleh.jpg', 'Tabouleh', '1800', 'Salads', null, null);
INSERT INTO `food` VALUES ('18', 'Summer.jpg', 'Summer', '1800', 'Salads', null, null);
INSERT INTO `food` VALUES ('19', 'Gallery.jpg', 'Gallery', '1600', 'Salads', null, null);
INSERT INTO `food` VALUES ('20', 'Bean Salad.jpg', 'Bean Salad\r\n', '1100', 'Salads', null, null);
INSERT INTO `food` VALUES ('21', 'Chicken Salad.jpg', 'Chicken Salad', '1600', 'Salads', null, null);
INSERT INTO `food` VALUES ('22', 'Miracle.jpg', 'Miracle', '1800', 'Salads', null, null);
INSERT INTO `food` VALUES ('23', 'Broccoli.jpg', 'Broccoli', '1500', 'Salads', null, null);
INSERT INTO `food` VALUES ('24', 'Cabbage.jpg', 'Cabbage', '1200', 'Salads', null, null);
INSERT INTO `food` VALUES ('25', 'Midday.jpg', 'Midday', '2100', 'Salads', null, null);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pic_url` varchar(255) DEFAULT 'profile.png',
  `age` int(11) DEFAULT NULL,
  `verify` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `code` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'Sveta', 'Ghazaryan', 'svetakazaryan96@gmail.com', '$2b$10$mg3Iw/Ke633KTiyiaUoCte/040oKzEJkpGGog5EE7k8bOKij/iEO6', 'profile.png', '19', '1', null, '6310', '1', null, null);
INSERT INTO `users` VALUES ('3', 'Taron', 'Ohanyan', 'nodetrain@gmail.com', '$2b$10$mWvyMFgNfy.kYXAt48DRPeleMurNsvLyZKJkvj/YqgGPS/rh5qCPi', 'profile.png', '39', '1', '', '5687', '0', '2023-05-31 16:20:56', '2023-05-31 16:20:56');
INSERT INTO `users` VALUES ('4', 'Stepan', 'Sargsyan', 'aaa@gmail.com', '$2b$10$wNY1jA2/TimJHc1zV5i6deIUvQVKK5OwFEoRFDcj7f1dn8UfrNLce', 'profile.png', '34', '1', null, null, '0', null, null);
INSERT INTO `users` VALUES ('5', 'Astghik', 'Barseghyan', 'astx@tumo.org', '$2b$10$mg3Iw/Ke633KTiyiaUoCte/040oKzEJkpGGog5EE7k8bOKij/iEO6', 'profile.png', '17', '1', null, null, '0', null, null);
INSERT INTO `users` VALUES ('6', 'Saten', 'Minasyan', 'sat@gmail.com', '$2b$10$wNY1jA2/TimJHc1zV5i6deIUvQVKK5OwFEoRFDcj7f1dn8UfrNLce', 'profile.png', '45', '1', null, null, '0', null, null);
INSERT INTO `users` VALUES ('7', 'Anna', 'Anyan', 'aa@mail.ru', '$2b$10$mg3Iw/Ke633KTiyiaUoCte/040oKzEJkpGGog5EE7k8bOKij/iEO6', 'profile.png', '20', '1', null, null, '0', null, null);
INSERT INTO `users` VALUES ('9', 'Gayane', 'Matilyan', 'gay@mail.ru', '$2b$10$5v5naZaezpXJzXU.S2gaquQjVMaJOR9j3vg7cdHqJvluPE7I1G72q', 'profile.png', '43', '1', '', null, '0', null, null);
INSERT INTO `users` VALUES ('10', 'Mane', 'Abrahamyan', 'mane.ab@gmail.com', '$2b$10$Quk0nReyVp/nUWVX0xPHNOt/7BbP7qQ7BIiDlJoLpWsQaJCbAyDWu', 'profile.png', '24', '1', '', null, '0', null, null);
INSERT INTO `users` VALUES ('11', 'Narine', 'Matevosyan', 'nar.mat@gmail.com', '$2b$10$.0c93TzicHOIQNgl.0QQX.S0ijmIvVpeDAX1uf9DuPnl4JsZr5vIm', 'profile.png', '35', '1', '', null, '0', null, null);
SET FOREIGN_KEY_CHECKS=1;
