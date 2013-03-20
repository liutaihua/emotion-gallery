-- MySQL dump 10.13  Distrib 5.1.66, for redhat-linux-gnu (x86_64)
--
-- Host: localhost    Database: b
-- ------------------------------------------------------
-- Server version	5.1.66

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
-- Table structure for table `UserProfile`
--

DROP TABLE IF EXISTS `UserProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserProfile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email_subscribe` varchar(100) DEFAULT NULL,
  `vars` varchar(300) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `bio` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_admin_rec_home`
--

DROP TABLE IF EXISTS `_admin_rec_home`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_admin_rec_home` (
  `id` int(11) DEFAULT NULL,
  `vars` varchar(300) DEFAULT NULL,
  `nid_sort` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `pid_sort` int(11) DEFAULT NULL,
  `nid` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_apply_permission_log`
--

DROP TABLE IF EXISTS `_apply_permission_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_apply_permission_log` (
  `id` int(11) DEFAULT NULL,
  `vars` varchar(300) DEFAULT NULL,
  `operator` varchar(100) DEFAULT NULL,
  `operating_ts` varchar(100) DEFAULT NULL,
  `result` varchar(200) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `douban_id` int(11) DEFAULT NULL,
  `reason` varchar(300) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_confirm_email`
--

DROP TABLE IF EXISTS `_confirm_email`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_confirm_email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(200) DEFAULT NULL,
  `douban_id` int(200) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  `creation_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `confirmed` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_feedback`
--

DROP TABLE IF EXISTS `_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_feedback` (
  `offset` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `douban_id` int(11) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `creation_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_node`
--

DROP TABLE IF EXISTS `_node`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_node` (
  `nodeImg` varchar(200) DEFAULT NULL,
  `nodeName` varchar(200) DEFAULT NULL,
  `nodeDesc` varchar(300) DEFAULT NULL,
  `nodeOpen` varchar(100) DEFAULT NULL,
  `node_author` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postMount` int(11) DEFAULT '1',
  `creation_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_notification`
--

DROP TABLE IF EXISTS `_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `mid` int(11) DEFAULT NULL,
  `nid` int(11) DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  `vars` varchar(300) DEFAULT NULL,
  `isread` int(11) DEFAULT '0',
  `type` int(11) DEFAULT NULL,
  `creation_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_notification_mention`
--

DROP TABLE IF EXISTS `_notification_mention`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_notification_mention` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `mid` int(11) DEFAULT NULL,
  `vars` varchar(300) DEFAULT NULL,
  `nid` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `isread` int(11) DEFAULT '0',
  `creation_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_permission`
--

DROP TABLE IF EXISTS `_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_permission` (
  `id` int(11) DEFAULT NULL,
  `vars` varchar(300) DEFAULT NULL,
  `operator` varchar(100) DEFAULT NULL,
  `operating_ts` varchar(100) DEFAULT NULL,
  `result` varchar(200) DEFAULT NULL,
  `douban_id` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `rights` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_post`
--

DROP TABLE IF EXISTS `_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_post` (
  `postImage` varchar(200) DEFAULT NULL,
  `postTitle` varchar(200) DEFAULT NULL,
  `postCaption` varchar(300) DEFAULT NULL,
  `postArticle` varchar(10000) DEFAULT NULL,
  `postAuthor` varchar(200) DEFAULT NULL,
  `postTemp` int(11) DEFAULT NULL,
  `nodeId` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(11) DEFAULT NULL,
  `magnitude` int(11) DEFAULT '0',
  `postMount` int(11) DEFAULT NULL,
  `creation_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment_num` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_post_comments`
--

DROP TABLE IF EXISTS `_post_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_post_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `creation_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_post_vote_user`
--

DROP TABLE IF EXISTS `_post_vote_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_post_vote_user` (
  `pid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` char(128) NOT NULL,
  `last_allowed_time` int(11) DEFAULT NULL,
  `atime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data` text,
  UNIQUE KEY `session_id` (`session_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `affiliation` varchar(200) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `referee_name` varchar(200) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `website` varchar(200) DEFAULT NULL,
  `interests` varchar(200) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `douban_id` int(11) DEFAULT NULL,
  `username` varchar(200) DEFAULT NULL,
  `via` smallint(6) DEFAULT '0',
  `lastLoginIP` varchar(100) DEFAULT NULL,
  `ipAddress` varchar(100) DEFAULT NULL,
  `avatarPath` varchar(100) DEFAULT NULL,
  `nicknameChangeTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastLoginTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `nickname` varchar(200) DEFAULT NULL,
  `joinTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `authKey` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-03-20 13:25:10
