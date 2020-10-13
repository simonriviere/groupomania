--
-- Base de données :  `formationSql`
--
CREATE DATABASE IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `groupomania`;

CREATE TABLE IF NOT EXISTS User(
`id` int(11) NOT NULL AUTO_INCREMENT,

`email` VARCHAR(50) NOT NULL  ,
`password` VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
) 
ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS Articles(
`id` int(11) NOT NULL AUTO_INCREMENT,
`titre` VARCHAR(250) NOT NULL , 
`commentaire` TEXT,
`image` TEXT NOT NULL,
PRIMARY KEY (id)
) 
ENGINE=InnoDB DEFAULT CHARSET=utf8;

