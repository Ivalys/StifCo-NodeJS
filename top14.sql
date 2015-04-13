-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mar 07 Avril 2015 à 10:31
-- Version du serveur: 5.5.41-0ubuntu0.14.04.1
-- Version de PHP: 5.5.9-1ubuntu4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `top14`
--
CREATE DATABASE IF NOT EXISTS `top14` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `top14`;

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

CREATE TABLE IF NOT EXISTS `inscription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idReservation` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Contenu de la table `inscription`
--

INSERT INTO `inscription` (`id`, `idReservation`, `idUser`) VALUES
(4, 12, 8),
(5, 14, 8),
(8, 15, 2);

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE IF NOT EXISTS `reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `auteur` int(11) NOT NULL COMMENT 'idUser',
  `dateDebut` varchar(255) NOT NULL,
  `dateFin` varchar(255) NOT NULL,
  `maxSeats` int(11) NOT NULL,
  `mairie` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Contenu de la table `reservation`
--

INSERT INTO `reservation` (`id`, `auteur`, `dateDebut`, `dateFin`, `maxSeats`, `mairie`) VALUES
(12, 6, '01/01/0001 à 01h01', '10/10/1110 à 10h10', 3, 'Doloréan'),
(14, 6, 'bzejhzeophj', 'erphjoerpohjep', 1, 'erophjerophjep'),
(15, 8, 'zrjhiopj', 'erophjeropjh', 231, 'rzejzperjhh');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `navigo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `user`, `mail`, `pass`, `nom`, `prenom`, `adresse`, `navigo`) VALUES
(1, 'supertoto', 'toto@toto.com', 'tata', 'titi', 'tutu', 'tete', 'supernavigo'),
(2, 'user', 'b', 'user', 'd', 'e', 'f', 'g'),
(3, 'b', 'c', 'd', 'e', 'f', 'g', 'h'),
(4, 'p', 'o', 'i', 'u', 'y', 't', 'r'),
(5, 'm', 'l', 'k', 'j', 'h', 'g', 'f'),
(6, 'admin', 'admin@admin.com', 'admin', 'admin', 'admin', 'admin', '1'),
(7, 'iojrehop', 'joehrophkeop', 'thope', 'hoerjkhope', 'hoprktho', 'trjkhop', 'jopthjeh'),
(8, 'admin2', 'admin2@admin2.com', 'admin2', 'admin2', 'admin2', 'admin2', 'admin2'),
(9, 'lpera', 'popo@popo.fr', '', 'Pera', 'Ludovic', 'caca', '69'),
(10, 'lpera2', 'popo@popo.fr', '', '', 'Ludovic', 'caca', '69'),
(11, 'lpera3', 'popo@popo.fr', 'popo', '', 'Ludovic', 'caca', '69'),
(12, 'irojzhpjp', 'eoprhj', '', 'erop', 'etop', 'ethjek', 'eprohjeporhe'),
(13, 'zizejpohj', 'zropejh', 'operhjeoprjhp', 'eophjeopr', 'ehrophjeropj', 'zrophjeopjhp', 'jeropjheoprhj');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
