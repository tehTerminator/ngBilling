-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2017 at 07:21 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Demo Category 1'),
(2, 'Demo Category 2'),
(3, 'Demo Category 3');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `posted_on` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `type` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `person_id`, `posted_on`, `type`) VALUES
(1, 3, '0000-00-00 00:00:00', 0),
(2, 3, '2017-07-30 09:02:04', 0),
(3, 3, '2017-07-30 11:06:18', 1),
(5, 5, '2017-07-30 20:05:22', 1),
(6, 5, '2017-07-30 20:08:16', 1),
(7, 5, '2017-07-30 20:12:20', 1),
(8, 1, '2017-07-30 20:13:25', 1);

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `tax_id` char(100) NOT NULL,
  `contact` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`id`, `name`, `company`, `address`, `tax_id`, `contact`) VALUES
(1, 'Prateek Kher', 'Maharaja Computers', 'Kher Garden Opp Civil Hospital Ashoknagar', '265135', '9144268770'),
(2, 'John', 'Intel Corporation', 'Some Where in \nThis world', '513152', '823513513'),
(3, 'Danny', 'Dog Food Company', 'New Delhi\nIndia', '626262', '6262326326'),
(4, 'Elsa', 'Sniffers', 'New Delhi\nIndia', '25168161', '4351352362'),
(5, 'Lulu', 'Walker Company', 'Mumbai', '6113515', '3168153168'),
(6, 'Blacky', 'GG Costumes', 'Kolkata', '354351', '6465151');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `category_id` int(11) NOT NULL,
  `unit` char(10) NOT NULL,
  `available_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `category_id`, `unit`, `available_quantity`) VALUES
(1, 'Product 1', 1, 'Kg', 262),
(2, 'Product 2', 2, 'Kg', 128),
(3, 'Product 3', 3, 'Piece', -143);

-- --------------------------------------------------------

--
-- Table structure for table `product_cost_history`
--

CREATE TABLE `product_cost_history` (
  `product_id` int(11) NOT NULL,
  `posted_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cost_price` double NOT NULL,
  `sgst_rate` double NOT NULL,
  `cgst_rate` double NOT NULL,
  `igst_rate` double NOT NULL DEFAULT '0',
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_cost_history`
--

INSERT INTO `product_cost_history` (`product_id`, `posted_on`, `cost_price`, `sgst_rate`, `cgst_rate`, `igst_rate`, `quantity`) VALUES
(1, '2017-07-18 03:34:07', 25, 9, 9, 0, 300),
(1, '2017-07-30 09:02:04', 30, 9, 9, 0, 25),
(2, '2017-07-18 03:34:08', 35, 9, 9, 0, 35),
(2, '2017-07-30 09:02:05', 150, 15, 15, 0, 30);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `name` char(30) NOT NULL,
  `data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `name`, `data`) VALUES
(1, 'company_name', 'Some Trading Company'),
(2, 'tax_id', 'BDDIV5353F'),
(3, 'address', 'Road No 3\r\nWard no 25 \r\nNew Delhi \r\nIndia'),
(4, 'contact', '9144268770');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `rate` double NOT NULL,
  `amountExTax` double NOT NULL,
  `sgst_rate` double NOT NULL,
  `sgst_amount` double NOT NULL,
  `cgst_rate` double NOT NULL,
  `cgst_amount` double NOT NULL,
  `invoice_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`product_id`, `quantity`, `rate`, `amountExTax`, `sgst_rate`, `sgst_amount`, `cgst_rate`, `cgst_amount`, `invoice_id`) VALUES
(1, 25, 2, 50, 9, 4.5, 9, 4.5, 0),
(1, 25, 30, 750, 9, 67.5, 9, 67.5, 1),
(1, 25, 30, 750, 9, 67.5, 9, 67.5, 2),
(1, 25, 30, 750, 9, 67.5, 9, 67.5, 3),
(1, 35, 20, 700, 9, 63, 9, 63, 7),
(1, 35, 20, 700, 9, 63, 9, 63, 8),
(2, 30, 15, 450, 9, 40.5, 9, 40.5, 0),
(2, 30, 150, 4500, 15, 675, 15, 675, 1),
(2, 30, 150, 4500, 15, 675, 15, 675, 2),
(2, 25, 30, 750, 9, 67.5, 9, 67.5, 3),
(2, 35, 20, 700, 15, 105, 15, 105, 8),
(3, 36, 15, 540, 9, 48.6, 9, 48.6, 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_cost_history`
--
ALTER TABLE `product_cost_history`
  ADD UNIQUE KEY `product_id` (`product_id`,`cost_price`,`sgst_rate`,`cgst_rate`,`igst_rate`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`product_id`,`invoice_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
