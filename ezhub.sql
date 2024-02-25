-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-02-2024 a las 22:05:30
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ezhub`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `amenity`
--

CREATE TABLE `amenity` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `amenity`
--

INSERT INTO `amenity` (`id`, `name`) VALUES
(1, 'TV'),
(2, 'Wifi'),
(3, 'Air conditioning'),
(4, 'Parking'),
(5, 'Elevator'),
(6, 'Heating'),
(7, 'Washing machine'),
(8, 'Dryer'),
(9, 'Doorman');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preference`
--

CREATE TABLE `preference` (
  `id` int(11) NOT NULL,
  `internet` tinyint(4) NOT NULL DEFAULT 0,
  `washer` tinyint(4) NOT NULL DEFAULT 0,
  `dryer` tinyint(4) NOT NULL DEFAULT 0,
  `deletedAt` datetime(6) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property`
--

CREATE TABLE `property` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `details` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL DEFAULT 'España',
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `bathrooms` int(11) NOT NULL,
  `property_size` int(11) NOT NULL,
  `smoking_allowed` tinyint(4) NOT NULL DEFAULT 0,
  `pets_allowed` tinyint(4) NOT NULL DEFAULT 0,
  `couples_allowed` tinyint(4) NOT NULL DEFAULT 0,
  `occupantCount` int(11) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `userEmail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property`
--

INSERT INTO `property` (`id`, `name`, `details`, `address`, `city`, `country`, `latitude`, `longitude`, `bedrooms`, `bathrooms`, `property_size`, `smoking_allowed`, `pets_allowed`, `couples_allowed`, `occupantCount`, `deletedAt`, `userEmail`) VALUES
(1, 'Mi Propiedad 1', 'Esta es una descripción detallada de mi propiedad.', 'Calle Falsa 123', 'Barcelona', 'España', 41.3938875, 2.1768128, 4, 2, 150, 0, 1, 0, 1, NULL, 'user1@gmail.com'),
(2, 'Mi Propiedad 2', 'Esta es una descripción detallada de mi propiedad.', 'Calle Falsa 123', 'Barcelona', 'España', 41.3955881, 2.1971930, 2, 1, 120, 0, 1, 0, 1, NULL, 'user2@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `details` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `is_available` tinyint(4) NOT NULL,
  `room_size` int(11) NOT NULL,
  `bed_type` enum('Single bed','Double bed','Sofa bed','No bed') NOT NULL,
  `available_from` varchar(255) NOT NULL,
  `utilities_included` tinyint(4) NOT NULL,
  `deposit_required` tinyint(4) NOT NULL,
  `services_included` varchar(255) NOT NULL,
  `photos` text NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `propertyId` int(11) NOT NULL,
  `userEmail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `room`
--

INSERT INTO `room` (`id`, `name`, `details`, `precio`, `is_available`, `room_size`, `bed_type`, `available_from`, `utilities_included`, `deposit_required`, `services_included`, `photos`, `deletedAt`, `propertyId`, `userEmail`) VALUES
(1, 'Habitación 1', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 350.00, 1, 13, 'Double bed', '2024-12-01T00:00:00.000Z', 1, 1, 'Contrato de alquiler, Servicio de limpieza, Ayuda con el registro en el ayuntamiento, Servicio de mantenimiento', '1.jpg', NULL, 1, 'user1@gmail.com'),
(2, 'Habitación 2', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quibusdam sapiente animi architecto laborum repellat aperiam.', 450.00, 1, 12, 'Double bed', '2024-03-01', 1, 1, 'Contrato de alquiler, Servicio de limpieza, Ayuda con el registro en el ayuntamiento, Servicio de mantenimiento', '2.jpg', NULL, 1, 'user1@gmail.com'),
(3, 'Habitación 3', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum voluptates repellendus cumque!', 300.00, 1, 11, 'Single bed', '2024-03-01', 1, 1, 'Contrato de alquiler, Servicio de limpieza, Ayuda con el registro en el ayuntamiento, Servicio de mantenimiento', '3.jpg', NULL, 1, 'user1@gmail.com'),
(4, 'Habitación 4', 'Lorem ipsum dolor sit amet consectetur.', 250.00, 1, 9, 'Single bed', '2024-03-01', 1, 1, 'Contrato de alquiler, Servicio de limpieza, Ayuda con el registro en el ayuntamiento, Servicio de mantenimiento', '4.jpg', NULL, 1, 'user1@gmail.com'),
(5, 'Habitación 5', 'Una habitación de lujo con vistas al mar.', 400.00, 1, 14, 'Double bed', '2024-03-01', 1, 1, 'Contrato de alquiler, Servicio de limpieza, Ayuda con el registro en el ayuntamiento, Servicio de mantenimiento', '5.jpg', NULL, 1, 'user1@gmail.com'),
(6, 'Habitación 6', 'Una habitación de lujo con vistas al mar.', 200.00, 1, 35, 'Single bed', '2024-12-01', 1, 1, 'Contrato de alquiler, Servicio de limpieza, Ayuda con el registro en el ayuntamiento, Servicio de mantenimiento', '6.jpg', NULL, 2, 'user2@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `room_amenity`
--

CREATE TABLE `room_amenity` (
  `id` int(11) NOT NULL,
  `roomId` int(11) DEFAULT NULL,
  `amenityId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `room_amenity`
--

INSERT INTO `room_amenity` (`id`, `roomId`, `amenityId`) VALUES
(11, 2, 2),
(12, 2, 6),
(13, 2, 7),
(14, 2, 5),
(15, 1, 9),
(16, 1, 6),
(17, 1, 3),
(18, 3, 3),
(19, 3, 4),
(20, 3, 5),
(21, 3, 2),
(22, 3, 9),
(23, 4, 5),
(24, 4, 2),
(25, 4, 9),
(26, 5, 5),
(27, 5, 2),
(28, 5, 9),
(29, 6, 5),
(30, 6, 2),
(31, 6, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `photo` varchar(255) NOT NULL,
  `registration_date` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `last_update` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deletedAt` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `role`, `first_name`, `last_name`, `phone`, `address`, `date_of_birth`, `photo`, `registration_date`, `last_update`, `deletedAt`) VALUES
(1, 'user1', 'user1@gmail.com', '$2a$10$NewO2nmA3APrcNoV2ciNFOx8R83OlOR7OgvHHS6XwgVOZ2LdyCv4.', 'user', '', '', 0, '', '0000-00-00 00:00:00', '', '2024-02-13 10:11:58.029472', '2024-02-13 10:11:58.029472', NULL),
(2, 'user2', 'user2@gmail.com', '$2a$10$XJr9xfGunYQ70SiTTxG2fOwEjR68EcVCUddqXgrbJRzF6VUeoULcC', 'user', '', '', 0, '', '0000-00-00 00:00:00', '', '2024-02-13 10:12:10.128090', '2024-02-13 10:12:10.128090', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `amenity`
--
ALTER TABLE `amenity`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_83b775fdebbe24c29b2b5831f2d` (`userId`),
  ADD KEY `FK_c6b36358f79d757a285407642e7` (`roomId`);

--
-- Indices de la tabla `preference`
--
ALTER TABLE `preference`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_e09c307436899ff3adc63774c4` (`user_id`);

--
-- Indices de la tabla `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_90ce45df244db4ea83dde5abf5a` (`userEmail`);

--
-- Indices de la tabla `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6a9adbe3db58dad30c0c63ca31d` (`propertyId`);

--
-- Indices de la tabla `room_amenity`
--
ALTER TABLE `room_amenity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d22e12e11e5a88a5674c0ec07d1` (`roomId`),
  ADD KEY `FK_54083a98feb2022919b02144927` (`amenityId`);

--
-- Indices de la tabla `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_b4a3d92d5dde30f3ab5c34c5862` (`user_id`),
  ADD KEY `FK_8a245154a06f088c003dfe1ceb9` (`room_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `amenity`
--
ALTER TABLE `amenity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `preference`
--
ALTER TABLE `preference`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `property`
--
ALTER TABLE `property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `room_amenity`
--
ALTER TABLE `room_amenity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `FK_83b775fdebbe24c29b2b5831f2d` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c6b36358f79d757a285407642e7` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `preference`
--
ALTER TABLE `preference`
  ADD CONSTRAINT `FK_e09c307436899ff3adc63774c4d` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `FK_90ce45df244db4ea83dde5abf5a` FOREIGN KEY (`userEmail`) REFERENCES `user` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `FK_6a9adbe3db58dad30c0c63ca31d` FOREIGN KEY (`propertyId`) REFERENCES `property` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `room_amenity`
--
ALTER TABLE `room_amenity`
  ADD CONSTRAINT `FK_54083a98feb2022919b02144927` FOREIGN KEY (`amenityId`) REFERENCES `amenity` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d22e12e11e5a88a5674c0ec07d1` FOREIGN KEY (`roomId`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `FK_8a245154a06f088c003dfe1ceb9` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_b4a3d92d5dde30f3ab5c34c5862` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
