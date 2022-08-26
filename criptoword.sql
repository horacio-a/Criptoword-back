-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 26-08-2022 a las 02:33:55
-- Versión del servidor: 5.7.36
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `criptoword`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mineria`
--

DROP TABLE IF EXISTS `mineria`;
CREATE TABLE IF NOT EXISTS `mineria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  `precio` float NOT NULL,
  `potencia` float NOT NULL,
  `unidadpotencia` varchar(250) NOT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  `tipo` varchar(250) NOT NULL,
  `ganancia` float NOT NULL,
  `consumo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mineria`
--

INSERT INTO `mineria` (`id`, `nombre`, `precio`, `potencia`, `unidadpotencia`, `img_id`, `tipo`, `ganancia`, `consumo`) VALUES
(11, 'Whatsminer M30S++', 1700000, 115, 'TH/s', 'qyw6rrrpgjhq68wqngi6', 'asics', 16.06, 3472),
(13, 'Bitmain Antminer S19 Pro', 3200000, 110, 'TH/s', 'ijejbnyfkowbgzhx790t', 'asics', 16.23, 3250),
(14, 'Bitmain Antminer S19j Pro', 3000000, 105, 'TH/s', 'szbahzrsxjfigvjojjmh', 'asics', 15.36, 3120),
(15, 'iPollo B2', 2500000, 110, 'TH/s', 'q1ya7revbqpa0tf129d5', 'asics', 16.23, 3250);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nft`
--

DROP TABLE IF EXISTS `nft`;
CREATE TABLE IF NOT EXISTS `nft` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  `precio` float NOT NULL,
  `coleccion` varchar(100) NOT NULL,
  `propietario` varchar(250) DEFAULT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  `Moneda` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `nft`
--

INSERT INTO `nft` (`id`, `nombre`, `precio`, `coleccion`, `propietario`, `img_id`, `Moneda`) VALUES
(7, '#6834', 69.15, 'Bored Ape Yacht Club', 'F149D6', 'crfeusdx7idn9tewgria', 'ETH'),
(10, '#5119', 78, 'Bored Ape Yacht Club', 'messagetochat', 'pq6njotht2qzzbuy3udr', 'ETH'),
(11, '#8922', 70.89, 'Bored Ape Yacht Club', 'hw5', 'hyvrbcplozfevoq0p8jv', 'ETH'),
(12, '#551', 74.99, 'Bored Ape Yacht Club', '  McTwister-vault', 'fgrev0n0m2wma0alm0bs', 'ETH'),
(13, '#5466', 75, 'Bored Ape Yacht Club', 'GLC', 'jcaq2tlvhtkqndpnjsjx', 'ETH'),
(14, '#5466', 75, 'Bored Ape Yacht Club', 'GLC', 'jcaq2tlvhtkqndpnjsjx', 'ETH'),
(15, '#551', 74.99, 'Bored Ape Yacht Club', '  McTwister-vault', 'fgrev0n0m2wma0alm0bs', 'ETH'),
(16, '#8922', 70.89, 'Bored Ape Yacht Club', 'hw5', 'hyvrbcplozfevoq0p8jv', 'ETH'),
(17, '#5119', 78, 'Bored Ape Yacht Club', 'messagetochat', 'pq6njotht2qzzbuy3udr', 'ETH'),
(18, '#6834', 69.15, 'Bored Ape Yacht Club', 'F149D6', 'crfeusdx7idn9tewgria', 'ETH'),
(20, 'CryptoPunk #4181', 160, 'CryptoPunks', 'B1ACFE', 'h9pjrapvz0qerwnyhheg', 'ETH'),
(21, 'CryptoPunk #8457', 70.99, 'CryptoPunks', ' punksotc.eth', 'ldihvlwvfukl0ccg6pcn', 'ETH'),
(22, 'CryptoPunk #7071', 77.99, 'CryptoPunks', 'F3F198', 'dis6rmnaqamg1x7pi9pb', 'ETH'),
(23, 'CryptoPunk #5736', 99.95, 'CryptoPunks', '  punksOTC2', 'uumoytfniqk4jr1bt7tn', 'ETH'),
(24, 'CryptoPunk #9400', 300, 'CryptoPunks', 'F3F198', 'nneetpgmqz71mpjdqnvg', 'ETH');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'horacio', 'e10adc3949ba59abbe56e057f20f883e'),
(3, 'horacio', '81dc9bdb52d04dc20036dbd8313ed055'),
(4, 'horacio', 'b6eb29bd247c236fd94718ad4f5f9eb1'),
(5, 'horacio', 'b6eb29bd247c236fd94718ad4f5f9eb1'),
(6, 'horacio', 'b6eb29bd247c236fd94718ad4f5f9eb1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
