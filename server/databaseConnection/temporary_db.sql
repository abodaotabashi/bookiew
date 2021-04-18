-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 11, 2021 at 05:38 PM
-- Server version: 5.6.13
-- PHP Version: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bookiew`
--
CREATE DATABASE IF NOT EXISTS `bookiew` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `bookiew`;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE IF NOT EXISTS `admins` (
  `adminID` int(11) NOT NULL AUTO_INCREMENT,
  `adminEmail` varchar(200) NOT NULL,
  `adminPassword` varchar(200) NOT NULL,
  PRIMARY KEY (`adminID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE IF NOT EXISTS `books` (
  `bookID` int(11) NOT NULL AUTO_INCREMENT,
  `bookName` varchar(300) NOT NULL,
  `author` varchar(200) NOT NULL,
  `publisher` varchar(500) NOT NULL,
  `publishingYear` year(4) NOT NULL,
  `bookLanguage` varchar(250) NOT NULL,
  `category` varchar(300) NOT NULL,
  `subject` varchar(150) NOT NULL,
  `bookCoverURL` varchar(700) NOT NULL,
  PRIMARY KEY (`bookID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`bookID`, `bookName`, `author`, `publisher`, `publishingYear`, `bookLanguage`, `category`, `subject`, `bookCoverURL`) VALUES
(1, 'book example', 'i_am_author', '', 0000, '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `commentID` int(11) NOT NULL AUTO_INCREMENT,
  `commentUserID` int(11) NOT NULL,
  `commentReviewID` int(11) NOT NULL,
  `commentDate` date NOT NULL,
  PRIMARY KEY (`commentID`),
  KEY `commentAuthorID` (`commentUserID`),
  KEY `commentReviewID` (`commentReviewID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE IF NOT EXISTS `ratings` (
  `ratingID` int(11) NOT NULL AUTO_INCREMENT,
  `ratingUserID` int(11) NOT NULL,
  `ratingReviewID` int(11) NOT NULL,
  `score` float NOT NULL,
  PRIMARY KEY (`ratingID`),
  KEY `ratingUserID` (`ratingUserID`),
  KEY `ratingReviewID` (`ratingReviewID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE IF NOT EXISTS `reviews` (
  `reviewID` int(11) NOT NULL AUTO_INCREMENT,
  `reviewUserID` int(11) NOT NULL,
  `reviewBookID` int(11) NOT NULL,
  `reviewText` text NOT NULL,
  `reviewDate` date NOT NULL,
  `reviewRating` float NOT NULL,
  PRIMARY KEY (`reviewID`),
  KEY `userID` (`reviewUserID`),
  KEY `bookID` (`reviewBookID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`reviewID`, `reviewUserID`, `reviewBookID`, `reviewText`, `reviewDate`, `reviewRating`) VALUES
(1, 1, 1, '', '0000-00-00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `birthdate` date NOT NULL,
  `gender` varchar(50) NOT NULL,
  `profilePhotoURL` varchar(700) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstname`, `surname`, `email`, `password`, `birthdate`, `gender`, `profilePhotoURL`) VALUES
(1, 'space_spoon', '', 'space@gmail.com', 'password1', '0000-00-00', '', '');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`commentUserID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`commentReviewID`) REFERENCES `reviews` (`reviewID`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`ratingUserID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`ratingReviewID`) REFERENCES `reviews` (`reviewID`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`reviewUserID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`reviewBookID`) REFERENCES `books` (`bookID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
