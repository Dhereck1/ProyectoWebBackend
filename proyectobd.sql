-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2021 at 01:18 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proyectobd`
--

-- --------------------------------------------------------

--
-- Table structure for table `canceladas`
--

CREATE TABLE `canceladas` (
  `idReporte` int(11) NOT NULL,
  `idCita` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cita`
--

CREATE TABLE `cita` (
  `idCita` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idMedico` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `estado` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cita`
--

INSERT INTO `cita` (`idCita`, `idUsuario`, `idMedico`, `fecha`, `hora`, `descripcion`, `estado`) VALUES
(4, 4, 2, '2021-08-22', '14:22:00', 'Dolor de espalda acompañado con tos relativamente frecuente', 'Cerrada'),
(10, 4, NULL, NULL, NULL, 'Dolor de cabeza, Fiebre , Nauseas', 'Abierta');

-- --------------------------------------------------------

--
-- Table structure for table `especialidades`
--

CREATE TABLE `especialidades` (
  `idEspecialidad` int(11) NOT NULL,
  `nombreEspecialidad` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `especialidades`
--

INSERT INTO `especialidades` (`idEspecialidad`, `nombreEspecialidad`) VALUES
(1, 'General'),
(2, 'Pediatria'),
(3, 'Dermatologia'),
(4, 'Cardiologia');

-- --------------------------------------------------------

--
-- Table structure for table `medico`
--

CREATE TABLE `medico` (
  `idMedico` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `especialidad` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medico`
--

INSERT INTO `medico` (`idMedico`, `nombre`, `apellido`, `especialidad`) VALUES
(1, 'Pepito', 'Lopez', 1),
(2, 'Lucia', 'Castillo', 2),
(3, 'Ruben', 'Castro', 3),
(4, 'Maria', 'Gonzales', 4),
(5, 'Luis', 'Jara', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `rut` varchar(45) NOT NULL,
  `contrasena` varchar(45) NOT NULL,
  `historiaClinica` text DEFAULT NULL,
  `rol` tinyint(4) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `region` varchar(45) NOT NULL,
  `comuna` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `rut`, `contrasena`, `historiaClinica`, `rol`, `direccion`, `region`, `comuna`, `correo`, `nombre`, `apellido`) VALUES
(1, '00000000-0', '202cb962ac59075b964b07152d234b70', NULL, 1, 'av. adminlandia 123', 'Admin', 'Adminlandia', 'correo@gmail.com', 'Administrador', 'soyadmin'),
(4, '19776416-3', '202cb962ac59075b964b07152d234b70', '', 2, 'FELIPE ii', '05', '05402', 'xd@gmail.com', 'Benjamin', 'Morales');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `canceladas`
--
ALTER TABLE `canceladas`
  ADD PRIMARY KEY (`idReporte`);

--
-- Indexes for table `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`idCita`),
  ADD KEY `citaUsuario` (`idUsuario`),
  ADD KEY `citaMedico` (`idMedico`);

--
-- Indexes for table `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`idEspecialidad`);

--
-- Indexes for table `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`idMedico`),
  ADD KEY `idEspecialidad` (`especialidad`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `canceladas`
--
ALTER TABLE `canceladas`
  MODIFY `idReporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cita`
--
ALTER TABLE `cita`
  MODIFY `idCita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `idEspecialidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `medico`
--
ALTER TABLE `medico`
  MODIFY `idMedico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `citaMedico` FOREIGN KEY (`idMedico`) REFERENCES `medico` (`idMedico`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `citaUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `medico`
--
ALTER TABLE `medico`
  ADD CONSTRAINT `idEspecialidad` FOREIGN KEY (`especialidad`) REFERENCES `especialidades` (`idEspecialidad`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
