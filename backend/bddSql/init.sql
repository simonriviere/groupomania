-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  mer. 14 oct. 2020 à 07:00
-- Version du serveur :  5.7.26
-- Version de PHP :  7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `Articles`
--

CREATE TABLE `Articles` (
  `id` int(11) NOT NULL,
  `titre` varchar(250) NOT NULL,
  `commentaire` text NOT NULL,
  `image` varchar(250) NOT NULL,
  `useId` int(11) NOT NULL,
  `dateCreation` datetime NOT NULL,
  `dateModification` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `nom` varchar(250) DEFAULT NULL,
  `prenom` varchar(250) DEFAULT NULL,
  `sexe` char(1) DEFAULT 'h',
  `pseudo` varchar(250) DEFAULT NULL,
  `imageProfil` varchar(250) DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Articles`
--
ALTER TABLE `Articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `titre` (`titre`),
  ADD KEY `useId` (`useId`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Articles`
--
ALTER TABLE `Articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Articles`
--
ALTER TABLE `Articles`
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`useId`) REFERENCES `User` (`id`);
