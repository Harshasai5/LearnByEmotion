-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2026 at 01:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emotion_learning`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `article_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `article_title` varchar(150) DEFAULT NULL,
  `article_content` longtext DEFAULT NULL,
  `article_order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`article_id`, `course_id`, `section_id`, `article_title`, `article_content`, `article_order`) VALUES
(2, 1, 1, 'Overview of Machine Learning & Data Science', 'Machine Learning and Data Science are two of the most important fields in today’s technology-driven world. They play a crucial role in building intelligent systems that can analyze data and make decisions with minimal human intervention.\r\n\r\nMachine Learning focuses on developing algorithms that allow systems to learn patterns from data. Instead of being explicitly programmed, these systems improve automatically with experience.\r\n\r\nData Science is a broader field that includes collecting, cleaning, analyzing, and interpreting large volumes of data. It combines statistics, programming, and domain knowledge.\r\n\r\nTogether, Machine Learning and Data Science power applications such as recommendation systems, fraud detection, healthcare analytics, and self-driving cars.', 1),
(3, 1, 1, 'Machine Learning vs Data Science', 'Machine Learning and Data Science are closely related but serve different purposes. Understanding their differences helps learners choose suitable career paths.\r\n\r\nMachine Learning focuses mainly on building predictive models using algorithms like regression, classification, and neural networks.\r\n\r\nData Science covers the entire data lifecycle including data collection, preprocessing, visualization, and communication of insights.\r\n\r\nIn practice, Data Science often uses Machine Learning as a tool while also focusing on analytical thinking and business understanding.', 2),
(4, 1, 1, 'Career Opportunities in ML & DS', 'Machine Learning and Data Science offer diverse career opportunities across industries such as healthcare, finance, and technology.\r\n\r\nPopular roles include Data Scientist, Machine Learning Engineer, Data Analyst, and AI Engineer.\r\n\r\nData Scientists focus on insights and analysis, while ML Engineers work on building and deploying scalable models.\r\n\r\nWith continuous learning and hands-on projects, professionals can achieve strong career growth and competitive salaries.', 3),
(5, 1, 1, 'Course Roadmap and Learning Outcomes', 'This course is structured as a 16-week roadmap that gradually builds skills from fundamentals to advanced concepts.\r\n\r\nThe initial phase focuses on Python, statistics, and data handling techniques.\r\n\r\nThe middle phase introduces supervised and unsupervised learning along with practical projects.\r\n\r\nBy the end of the course, learners gain confidence in solving real-world problems and understanding ML & DS career paths.', 4);

-- --------------------------------------------------------

--
-- Table structure for table `article_progress`
--

CREATE TABLE `article_progress` (
  `id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `article_id` int(11) DEFAULT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `article_progress`
--

INSERT INTO `article_progress` (`id`, `student_id`, `course_id`, `section_id`, `article_id`, `completed`, `completed_at`) VALUES
(1, 1, 1, 1, 2, 1, '2026-03-17 11:28:45'),
(2, 1, 1, 1, 3, 1, '2026-03-18 08:21:27');

-- --------------------------------------------------------

--
-- Table structure for table `chat_message`
--

CREATE TABLE `chat_message` (
  `chat_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `session_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `response` text DEFAULT NULL,
  `emotion` varchar(50) DEFAULT NULL,
  `is_useful` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_message`
--

INSERT INTO `chat_message` (`chat_id`, `student_id`, `session_id`, `message`, `response`, `emotion`, `is_useful`, `created_at`) VALUES
(1, 1, NULL, 'hello', 'Groq Error: Error code: 400 - {\'error\': {\'message\': \'The model `llama3-70b-8192` has been decommissioned and is no longer supported. Please refer to https://console.groq.com/docs/deprecations for a recommendation on which model to use instead.\', \'type\': \'invalid_request_error\', \'code\': \'model_decommissioned\'}}', 'Neutral', 0, '2026-03-19 12:25:54'),
(2, 1, NULL, 'hello', 'Hello! It\'s great to connect with you. How can I assist you today? Are you looking for help with a specific subject or topic, or would you like some recommendations for learning resources?', 'Neutral', 0, '2026-03-19 12:31:04'),
(3, 1, NULL, 'hello', 'Hello! It\'s great to connect with you. I\'m here to help with any educational questions or topics you\'d like to explore. What\'s on your mind today? Would you like to learn about a specific subject or topic, or maybe we can brainstorm something new together?', 'Neutral', 0, '2026-03-19 12:31:11'),
(4, 1, NULL, 'what is ml', 'Let\'s explore Machine Learning (ML) together.\n\nMachine Learning is a subfield of Artificial Intelligence (AI) that involves training computers to make decisions or predictions based on data. It\'s a way to teach computers to learn from experience, just like humans do.\n\nImagine you\'re teaching a child to recognize different types of fruits. You show them many pictures of fruits and tell them what they are. Over time, the child starts to recognize the patterns and can identify the fruits on their own. Machine Learning works in a similar way, but instead of a child, it\'s a computer program that learns from data.\n\nThere are several types of Machine Learning:\n\n1. **Supervised Learning**: The computer is shown examples of data and their corresponding labels (e.g., pictures of cats and dogs with their respective labels).\n2. **Unsupervised Learning**: The computer is given a dataset and it finds patterns or relationships within the data on its own.\n3. **Reinforcement Learning**: The computer learns by interacting with an environment and receiving feedback in the form of rewards or penalties.\n\nMachine Learning has many applications in areas like image recognition, natural language processing, and predictive analytics. It\'s a rapidly growing field that\'s changing the way we live and work.\n\nHow\'s that? Do you have any specific questions about Machine Learning?', 'Neutral', 1, '2026-03-19 12:31:18'),
(5, 1, NULL, 'can u give what is ml in short answered way', 'Machine Learning (ML) in short is the ability of computers to learn and improve from experience without being explicitly programmed.', 'Neutral', 1, '2026-03-19 12:31:58');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `description`) VALUES
(1, 'Machine Learning & Data Science', 'A job acquiring course on Machine Learning & Data Science designed for 16 weeks with a valid certificate');

-- --------------------------------------------------------

--
-- Table structure for table `course_progress`
--

CREATE TABLE `course_progress` (
  `course_progress_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `progress_percentage` float DEFAULT 0,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_progress`
--

INSERT INTO `course_progress` (`course_progress_id`, `student_id`, `course_id`, `progress_percentage`, `last_updated`) VALUES
(3, 1, 1, 50, '2026-03-17 11:05:36');

-- --------------------------------------------------------

--
-- Table structure for table `emotion_logs`
--

CREATE TABLE `emotion_logs` (
  `emotion_log_id` int(11) NOT NULL,
  `session_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `emotion` varchar(50) DEFAULT NULL,
  `logged_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emotion_logs`
--

INSERT INTO `emotion_logs` (`emotion_log_id`, `session_id`, `student_id`, `emotion`, `logged_at`) VALUES
(632, 65, 1, 'Sad', '2026-03-18 09:06:38'),
(633, 65, 1, 'Sad', '2026-03-18 09:06:40'),
(634, 65, 1, 'Surprise', '2026-03-18 09:06:42'),
(635, 65, 1, 'Sad', '2026-03-18 09:06:44'),
(636, 65, 1, 'Sad', '2026-03-18 09:06:46'),
(637, 65, 1, 'Sad', '2026-03-18 09:06:49'),
(638, 65, 1, 'Sad', '2026-03-18 09:06:51'),
(639, 65, 1, 'Sad', '2026-03-18 09:06:53'),
(640, 65, 1, 'Surprise', '2026-03-18 09:06:55'),
(641, 65, 1, 'Surprise', '2026-03-18 09:06:57'),
(642, 65, 1, 'Sad', '2026-03-18 09:06:59'),
(643, 65, 1, 'Surprise', '2026-03-18 09:07:01'),
(644, 65, 1, 'Sad', '2026-03-18 09:07:03'),
(645, 65, 1, 'Sad', '2026-03-18 09:07:05'),
(646, 65, 1, 'Surprise', '2026-03-18 09:07:07'),
(647, 65, 1, 'Sad', '2026-03-18 09:07:11'),
(648, 65, 1, 'Sad', '2026-03-18 09:07:13'),
(649, 65, 1, 'Surprise', '2026-03-18 09:07:15'),
(650, 65, 1, 'Surprise', '2026-03-18 09:07:17'),
(651, 65, 1, 'Sad', '2026-03-18 09:07:19'),
(652, 65, 1, 'Sad', '2026-03-18 09:07:21'),
(653, 67, 1, 'Sad', '2026-03-18 21:24:50'),
(654, 67, 1, 'Sad', '2026-03-18 21:24:52'),
(655, 67, 1, 'Neutral', '2026-03-18 21:24:54'),
(656, 67, 1, 'Sad', '2026-03-18 21:24:56'),
(657, 67, 1, 'Sad', '2026-03-18 21:24:59'),
(658, 67, 1, 'Sad', '2026-03-18 21:25:01');

-- --------------------------------------------------------

--
-- Table structure for table `fill_blanks_games`
--

CREATE TABLE `fill_blanks_games` (
  `fill_blanks_game_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `options_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options_json`)),
  `correct_mapping_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`correct_mapping_json`)),
  `difficulty` enum('easy','medium','hard') DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fill_blanks_games`
--

INSERT INTO `fill_blanks_games` (`fill_blanks_game_id`, `course_id`, `section_id`, `question`, `options_json`, `correct_mapping_json`, `difficulty`, `active`) VALUES
(1, 1, 1, 'Machine Learning learns from ____ and Data Science extracts ____.', '[\"data\",\"insights\",\"hardware\",\"networks\"]', '{\"0\":\"data\",\"1\":\"insights\"}', 'easy', 1);

-- --------------------------------------------------------

--
-- Table structure for table `learning_sessions`
--

CREATE TABLE `learning_sessions` (
  `session_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `article_id` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `final_emotion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `learning_sessions`
--

INSERT INTO `learning_sessions` (`session_id`, `student_id`, `course_id`, `section_id`, `article_id`, `start_time`, `end_time`, `final_emotion`) VALUES
(5, 1, 1, 1, 2, '2026-01-27 13:16:36', '2026-01-27 13:17:40', 'Happy'),
(7, 1, 1, 1, 2, '2026-01-28 13:54:27', '2026-01-28 13:56:29', 'Sad'),
(8, 3, 1, 1, 2, '2026-01-30 15:27:02', '2026-01-30 15:27:04', 'Neutral'),
(9, 3, 1, 1, 3, '2026-01-30 15:27:14', '2026-01-30 15:29:29', 'Sad'),
(10, 3, 1, 1, 2, '2026-01-30 15:29:34', '2026-01-30 15:31:15', 'Sad'),
(11, 1, 1, 1, 2, '2026-01-30 15:33:16', '2026-01-30 15:34:05', 'Sad'),
(12, 1, 1, 1, 2, '2026-01-30 15:43:16', '2026-01-30 15:45:10', 'Sad'),
(13, 1, 1, 1, 2, '2026-01-30 15:47:49', '2026-01-30 15:48:20', 'Sad'),
(14, 1, 1, 1, 2, '2026-01-30 15:49:03', NULL, NULL),
(15, 1, 1, 1, 3, '2026-01-30 15:49:16', '2026-01-30 15:50:13', 'Neutral'),
(16, 1, 1, 1, 3, '2026-01-30 15:59:57', NULL, NULL),
(17, 1, 1, 1, 3, '2026-01-30 16:00:08', '2026-01-30 16:00:10', 'Neutral'),
(18, 1, 1, 1, 5, '2026-01-30 16:00:16', '2026-01-30 16:02:53', 'Sad'),
(19, 1, 1, 1, 4, '2026-01-30 16:30:01', '2026-01-30 16:30:44', 'Sad'),
(20, 1, 1, 1, 3, '2026-01-30 16:50:31', NULL, NULL),
(21, 1, 1, 1, 2, '2026-03-17 14:46:42', '2026-03-17 14:47:15', 'Confused'),
(22, 1, 1, 1, 2, '2026-03-17 15:47:48', '2026-03-17 15:47:51', 'Neutral'),
(23, 1, 1, 1, 2, '2026-03-17 16:23:13', '2026-03-17 16:23:54', 'Sad'),
(24, 1, 1, 1, 2, '2026-03-17 16:35:41', '2026-03-17 16:36:21', 'Sad'),
(25, 1, 1, 1, 2, '2026-03-17 16:41:22', '2026-03-17 16:42:50', 'Sad'),
(26, 1, 1, 1, 2, '2026-03-17 16:44:04', NULL, NULL),
(27, 1, 1, 1, 2, '2026-03-17 16:44:04', NULL, NULL),
(28, 1, 1, 1, 2, '2026-03-17 16:44:25', NULL, NULL),
(29, 1, 1, 1, 2, '2026-03-17 16:44:25', NULL, NULL),
(30, 1, 1, 1, 2, '2026-03-17 16:44:37', '2026-03-17 16:44:39', 'Neutral'),
(31, 1, 1, 1, 2, '2026-03-17 16:50:47', NULL, NULL),
(32, 1, 1, 1, 2, '2026-03-17 16:56:01', NULL, NULL),
(33, 1, 1, 1, 2, '2026-03-17 16:58:15', '2026-03-17 16:58:45', 'Confused'),
(34, 1, 1, 1, 2, '2026-03-17 17:07:09', NULL, NULL),
(35, 1, 1, 1, 2, '2026-03-17 17:07:15', '2026-03-17 17:07:18', 'Neutral'),
(36, 1, 1, 1, 2, '2026-03-17 17:07:29', '2026-03-17 17:07:58', 'Sad'),
(37, 1, 1, 1, 2, '2026-03-17 17:08:06', NULL, NULL),
(38, 1, 1, 1, 2, '2026-03-17 17:08:49', '2026-03-17 17:08:50', 'Neutral'),
(39, 1, 1, 1, 3, '2026-03-18 13:50:52', '2026-03-18 13:51:27', 'Frustrated'),
(40, 1, 1, 1, 3, '2026-03-18 13:51:39', NULL, NULL),
(41, 1, 1, 1, 3, '2026-03-18 13:51:57', '2026-03-18 13:51:58', 'Neutral'),
(42, 1, 1, 1, 2, '2026-03-18 14:02:10', '2026-03-18 14:02:48', 'Neutral'),
(43, 1, 1, 1, 2, '2026-03-18 14:03:54', '2026-03-18 14:03:55', 'Neutral'),
(44, 1, 1, 1, 2, '2026-03-18 14:08:59', '2026-03-18 14:10:01', 'Sad'),
(45, 1, 1, 1, 2, '2026-03-18 14:14:10', '2026-03-18 14:15:08', 'Sad'),
(46, 1, 1, 1, 2, '2026-03-18 14:29:00', NULL, NULL),
(47, 1, 1, 1, 2, '2026-03-18 14:29:07', NULL, NULL),
(48, 1, 1, 1, 2, '2026-03-18 14:29:09', '2026-03-18 14:30:23', 'Neutral'),
(49, 1, 1, 1, 2, '2026-03-18 14:31:20', NULL, NULL),
(50, 1, 1, 1, 2, '2026-03-18 14:31:20', NULL, NULL),
(51, 1, 1, 1, 2, '2026-03-18 14:31:24', NULL, NULL),
(52, 1, 1, 1, 2, '2026-03-18 14:31:24', NULL, NULL),
(53, 1, 1, 1, 2, '2026-03-18 14:31:26', NULL, NULL),
(54, 1, 1, 1, 2, '2026-03-18 14:31:26', NULL, NULL),
(55, 1, 1, 1, 2, '2026-03-18 14:31:31', NULL, NULL),
(56, 1, 1, 1, 2, '2026-03-18 14:31:31', NULL, NULL),
(57, 1, 1, 1, 2, '2026-03-18 14:31:40', NULL, NULL),
(58, 1, 1, 1, 2, '2026-03-18 14:32:07', NULL, NULL),
(59, 1, 1, 1, 2, '2026-03-18 14:32:07', NULL, NULL),
(60, 1, 1, 1, 2, '2026-03-18 14:32:10', NULL, NULL),
(61, 1, 1, 1, 2, '2026-03-18 14:32:10', NULL, NULL),
(62, 1, 1, 1, 2, '2026-03-18 14:32:29', NULL, NULL),
(63, 1, 1, 1, 2, '2026-03-18 14:32:30', '2026-03-18 14:32:45', 'Neutral'),
(64, 1, 1, 1, 2, '2026-03-18 14:33:52', '2026-03-18 14:34:02', 'Sad'),
(65, 1, 1, 1, 2, '2026-03-18 14:36:31', NULL, NULL),
(66, 1, 1, 1, 2, '2026-03-18 14:36:35', '2026-03-18 14:37:21', 'Neutral'),
(67, 1, 1, 1, 2, '2026-03-19 02:54:35', '2026-03-19 02:55:01', 'Sad');

-- --------------------------------------------------------

--
-- Table structure for table `match_flow_games`
--

CREATE TABLE `match_flow_games` (
  `match_flow_game_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `steps_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`steps_json`)),
  `correct_order_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`correct_order_json`)),
  `difficulty` enum('easy','medium','hard') DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `match_flow_games`
--

INSERT INTO `match_flow_games` (`match_flow_game_id`, `course_id`, `section_id`, `steps_json`, `correct_order_json`, `difficulty`, `active`) VALUES
(1, 1, 1, '[\"Collect Data\",\"Clean Data\",\"Train Model\",\"Evaluate Model\",\"Deploy Model\"]', '[0,1,2,3,4]', 'easy', 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `chat_id` int(11) DEFAULT NULL,
  `sender` enum('user','bot') DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_games`
--

CREATE TABLE `quiz_games` (
  `quiz_game_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `options_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options_json`)),
  `correct_answer` varchar(255) DEFAULT NULL,
  `difficulty` enum('easy','medium','hard') DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `article_id` int(11) DEFAULT NULL,
  `quiz_title` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_games`
--

INSERT INTO `quiz_games` (`quiz_game_id`, `course_id`, `section_id`, `question`, `options_json`, `correct_answer`, `difficulty`, `active`, `article_id`, `quiz_title`) VALUES
(1, 1, 1, 'Machine Learning is mainly used to?', '[\"Learn from data\",\"Design websites\",\"Manage servers\",\"Create networks\"]', 'Learn from data', 'easy', 1, 1, 'intro'),
(2, 1, 1, 'Which field focuses more on data insights?', '[\"Data Science\",\"Machine Learning\",\"Networking\",\"Cloud Computing\"]', 'Data Science', 'easy', 1, 1, 'intro'),
(3, 1, 1, 'Which is a valid ML & DS career role?', '[\"Data Scientist\",\"Web Designer\",\"System Admin\",\"Network Engineer\"]', 'Data Scientist', 'easy', 1, 1, 'intro'),
(4, 1, 1, 'What is the duration of this course?', '[\"16 weeks\",\"4 weeks\",\"8 weeks\",\"1 year\"]', '16 weeks', 'easy', 1, 1, 'intro');

-- --------------------------------------------------------

--
-- Table structure for table `recommendations`
--

CREATE TABLE `recommendations` (
  `recommendation_id` int(11) NOT NULL,
  `session_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `emotion` varchar(50) DEFAULT NULL,
  `recommendation_type` varchar(50) DEFAULT NULL,
  `recommendation_ref_id` int(11) DEFAULT NULL,
  `shown_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `clicked` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recommendations`
--

INSERT INTO `recommendations` (`recommendation_id`, `session_id`, `student_id`, `emotion`, `recommendation_type`, `recommendation_ref_id`, `shown_at`, `clicked`) VALUES
(2, 5, 1, 'Happy', 'Deep Dive Mode', NULL, '2026-01-27 07:47:40', 0),
(3, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:24:54', 0),
(4, 7, NULL, 'Angry', 'Continue Learning', NULL, '2026-01-28 08:24:54', 0),
(5, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:24:57', 0),
(6, 7, NULL, 'Surprise', 'Continue Learning', NULL, '2026-01-28 08:24:57', 0),
(7, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:00', 0),
(8, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:00', 0),
(9, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:03', 0),
(10, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:03', 0),
(11, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:06', 0),
(12, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:07', 0),
(13, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:10', 0),
(14, 7, NULL, 'Surprise', 'Continue Learning', NULL, '2026-01-28 08:25:10', 0),
(15, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:13', 0),
(16, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:13', 0),
(17, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:16', 0),
(18, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:16', 0),
(19, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:19', 0),
(20, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:19', 0),
(21, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:22', 0),
(22, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:22', 0),
(23, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:25', 0),
(24, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:25', 0),
(25, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:28', 0),
(26, 7, NULL, 'Surprise', 'Continue Learning', NULL, '2026-01-28 08:25:28', 0),
(27, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:31', 0),
(28, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:31', 0),
(29, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:34', 0),
(30, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:34', 0),
(31, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:37', 0),
(32, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:37', 0),
(33, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:40', 0),
(34, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:40', 0),
(35, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:43', 0),
(36, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:43', 0),
(37, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:46', 0),
(38, 7, NULL, 'Angry', 'Continue Learning', NULL, '2026-01-28 08:25:46', 0),
(39, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:49', 0),
(40, 7, NULL, 'Surprise', 'Continue Learning', NULL, '2026-01-28 08:25:49', 0),
(41, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:52', 0),
(42, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:25:52', 0),
(43, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:55', 0),
(44, 7, NULL, 'Fear', 'Continue Learning', NULL, '2026-01-28 08:25:55', 0),
(45, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:25:58', 0),
(46, 7, NULL, 'Surprise', 'Continue Learning', NULL, '2026-01-28 08:25:59', 0),
(47, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:26:02', 0),
(48, 7, NULL, 'Surprise', 'Continue Learning', NULL, '2026-01-28 08:26:02', 0),
(49, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:26:05', 0),
(50, 7, NULL, 'Surprise', 'Continue Learning', NULL, '2026-01-28 08:26:05', 0),
(51, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:26:08', 0),
(52, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:26:08', 0),
(53, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:26:11', 0),
(54, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:26:11', 0),
(55, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:26:14', 0),
(56, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:26:14', 0),
(57, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:26:17', 0),
(58, 7, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-28 08:26:17', 0),
(59, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:26:20', 0),
(60, 7, NULL, 'Surprise', 'Continue Learning', NULL, '2026-01-28 08:26:20', 0),
(61, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:26:23', 0),
(62, 7, NULL, 'Surprise', 'Continue Learning', NULL, '2026-01-28 08:26:23', 0),
(63, 7, 1, NULL, 'Continue Learning', NULL, '2026-01-28 08:26:27', 0),
(64, 7, NULL, 'Surprise', 'Continue Learning', NULL, '2026-01-28 08:26:27', 0),
(65, 7, 1, 'Sad', 'Reflection Mode', NULL, '2026-01-28 08:26:29', 0),
(66, 8, 3, 'Neutral', 'Continue Learning', NULL, '2026-01-30 09:57:04', 0),
(67, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:57:23', 0),
(68, 9, NULL, 'Angry', 'Continue Learning', NULL, '2026-01-30 09:57:23', 0),
(69, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:57:26', 0),
(70, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:57:26', 0),
(71, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:57:29', 0),
(72, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:57:29', 0),
(73, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:57:32', 0),
(74, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:57:32', 0),
(75, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:57:36', 0),
(76, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:57:36', 0),
(77, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:57:39', 0),
(78, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:57:39', 0),
(79, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:57:42', 0),
(80, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:57:42', 0),
(81, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:57:45', 0),
(82, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:57:45', 0),
(83, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:57:48', 0),
(84, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:57:48', 0),
(85, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:57:51', 0),
(86, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:57:51', 0),
(87, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:57:54', 0),
(88, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:57:54', 0),
(89, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:57:57', 0),
(90, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:57:57', 0),
(91, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:58:00', 0),
(92, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:58:00', 0),
(93, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:58:03', 0),
(94, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:58:03', 0),
(95, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:58:06', 0),
(96, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:58:06', 0),
(97, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:58:09', 0),
(98, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:58:09', 0),
(99, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:58:12', 0),
(100, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:58:12', 0),
(101, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:58:15', 0),
(102, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:58:15', 0),
(103, 9, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:58:18', 0),
(104, 9, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:58:18', 0),
(105, 9, 3, 'Sad', 'Reflection Mode', NULL, '2026-01-30 09:58:20', 0),
(106, 9, 3, 'Sad', 'Reflection Mode', NULL, '2026-01-30 09:59:28', 0),
(107, 9, 3, 'Sad', 'Reflection Mode', NULL, '2026-01-30 09:59:29', 0),
(108, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:59:42', 0),
(109, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:59:42', 0),
(110, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:59:45', 0),
(111, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:59:45', 0),
(112, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:59:48', 0),
(113, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:59:48', 0),
(114, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:59:51', 0),
(115, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:59:51', 0),
(116, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:59:54', 0),
(117, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:59:54', 0),
(118, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 09:59:57', 0),
(119, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 09:59:57', 0),
(120, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:00', 0),
(121, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:00', 0),
(122, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:03', 0),
(123, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:03', 0),
(124, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:06', 0),
(125, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:06', 0),
(126, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:09', 0),
(127, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:09', 0),
(128, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:13', 0),
(129, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:13', 0),
(130, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:16', 0),
(131, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:16', 0),
(132, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:19', 0),
(133, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:19', 0),
(134, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:22', 0),
(135, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:22', 0),
(136, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:25', 0),
(137, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:25', 0),
(138, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:28', 0),
(139, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:28', 0),
(140, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:31', 0),
(141, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:31', 0),
(142, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:34', 0),
(143, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:34', 0),
(144, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:37', 0),
(145, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:37', 0),
(146, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:40', 0),
(147, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:40', 0),
(148, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:43', 0),
(149, 10, NULL, 'Surprise', 'Continue Learning', NULL, '2026-01-30 10:00:43', 0),
(150, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:46', 0),
(151, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:46', 0),
(152, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:49', 0),
(153, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:49', 0),
(154, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:52', 0),
(155, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:52', 0),
(156, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:55', 0),
(157, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:55', 0),
(158, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:00:58', 0),
(159, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:00:58', 0),
(160, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:01:01', 0),
(161, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:01:01', 0),
(162, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:01:05', 0),
(163, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:01:05', 0),
(164, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:01:08', 0),
(165, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:01:08', 0),
(166, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:01:11', 0),
(167, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:01:11', 0),
(168, 10, 3, NULL, 'Continue Learning', NULL, '2026-01-30 10:01:14', 0),
(169, 10, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:01:14', 0),
(170, 10, 3, 'Sad', 'Reflection Mode', NULL, '2026-01-30 10:01:15', 0),
(171, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:03:24', 0),
(172, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:03:24', 0),
(173, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:03:27', 0),
(174, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:03:27', 0),
(175, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:03:30', 0),
(176, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:03:30', 0),
(177, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:03:33', 0),
(178, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:03:33', 0),
(179, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:03:36', 0),
(180, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:03:36', 0),
(181, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:03:39', 0),
(182, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:03:39', 0),
(183, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:03:42', 0),
(184, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:03:42', 0),
(185, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:03:45', 0),
(186, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:03:45', 0),
(187, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:03:48', 0),
(188, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:03:48', 0),
(189, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:03:51', 0),
(190, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:03:51', 0),
(191, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:03:54', 0),
(192, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:03:54', 0),
(193, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:03:57', 0),
(194, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:03:57', 0),
(195, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:04:00', 0),
(196, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:04:00', 0),
(197, 11, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:04:03', 0),
(198, 11, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:04:03', 0),
(199, 11, 1, 'Sad', 'Reflection Mode', NULL, '2026-01-30 10:04:05', 0),
(200, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:13:26', 0),
(201, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:13:26', 0),
(202, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:13:29', 0),
(203, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:13:29', 0),
(204, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:13:32', 0),
(205, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:13:32', 0),
(206, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:13:36', 0),
(207, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:13:36', 0),
(208, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:13:39', 0),
(209, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:13:39', 0),
(210, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:13:42', 0),
(211, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:13:42', 0),
(212, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:13:45', 0),
(213, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:13:45', 0),
(214, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:13:48', 0),
(215, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:13:48', 0),
(216, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:13:51', 0),
(217, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:13:51', 0),
(218, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:13:54', 0),
(219, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:13:54', 0),
(220, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:13:57', 0),
(221, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:13:57', 0),
(222, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:00', 0),
(223, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:00', 0),
(224, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:03', 0),
(225, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:03', 0),
(226, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:06', 0),
(227, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:06', 0),
(228, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:09', 0),
(229, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:09', 0),
(230, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:12', 0),
(231, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:12', 0),
(232, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:15', 0),
(233, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:15', 0),
(234, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:18', 0),
(235, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:18', 0),
(236, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:21', 0),
(237, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:21', 0),
(238, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:24', 0),
(239, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:24', 0),
(240, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:27', 0),
(241, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:28', 0),
(242, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:31', 0),
(243, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:31', 0),
(244, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:34', 0),
(245, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:34', 0),
(246, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:37', 0),
(247, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:37', 0),
(248, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:40', 0),
(249, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:40', 0),
(250, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:43', 0),
(251, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:43', 0),
(252, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:46', 0),
(253, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:46', 0),
(254, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:49', 0),
(255, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:49', 0),
(256, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:52', 0),
(257, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:52', 0),
(258, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:55', 0),
(259, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:55', 0),
(260, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:14:58', 0),
(261, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:14:58', 0),
(262, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:15:01', 0),
(263, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:15:01', 0),
(264, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:15:04', 0),
(265, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:15:04', 0),
(266, 12, 1, NULL, 'Continue Learning', NULL, '2026-01-30 10:15:07', 0),
(267, 12, NULL, 'Sad', 'Continue Learning', NULL, '2026-01-30 10:15:07', 0),
(268, 12, 1, 'Sad', 'Reflection Mode', NULL, '2026-01-30 10:15:10', 0),
(269, 13, 1, 'Sad', 'Reflection Mode', NULL, '2026-01-30 10:18:20', 0),
(270, 15, 1, 'Neutral', 'Continue Learning', NULL, '2026-01-30 10:20:13', 0),
(271, 17, 1, 'Neutral', 'Continue Learning', NULL, '2026-01-30 10:30:10', 0),
(272, 18, 1, 'Sad', 'Reflection Mode', NULL, '2026-01-30 10:32:53', 0),
(273, 19, 1, 'Sad', 'Reflection Mode', NULL, '2026-01-30 11:00:44', 0),
(274, 21, 1, 'Confused', 'AI Tutor', NULL, '2026-03-17 09:17:15', 0),
(275, 22, 1, 'Neutral', 'continue', NULL, '2026-03-17 10:17:51', 0),
(276, 23, 1, 'Sad', 'chatbot', NULL, '2026-03-17 10:53:54', 0),
(277, 24, 1, 'Sad', 'chatbot', NULL, '2026-03-17 11:06:21', 0),
(278, 25, 1, 'Sad', 'chatbot', NULL, '2026-03-17 11:12:50', 0),
(279, 30, 1, 'Neutral', 'continue', NULL, '2026-03-17 11:14:39', 0),
(280, 33, 1, 'Confused', 'chatbot', NULL, '2026-03-17 11:28:45', 0),
(281, 35, 1, 'Neutral', 'continue', NULL, '2026-03-17 11:37:19', 0),
(282, 36, 1, 'Sad', 'chatbot', NULL, '2026-03-17 11:37:58', 0),
(283, 38, 1, 'Neutral', 'continue', NULL, '2026-03-17 11:38:50', 0),
(284, 39, 1, 'Frustrated', 'break', NULL, '2026-03-18 08:21:27', 0),
(285, 41, 1, 'Neutral', 'continue', NULL, '2026-03-18 08:21:58', 0),
(286, 42, 1, 'Neutral', 'continue', NULL, '2026-03-18 08:32:48', 0),
(287, 43, 1, 'Neutral', 'continue', NULL, '2026-03-18 08:33:55', 0),
(288, 44, 1, 'Sad', 'chatbot', NULL, '2026-03-18 08:40:01', 0),
(289, 45, 1, 'Sad', 'chatbot', NULL, '2026-03-18 08:45:08', 0),
(290, 48, 1, 'Neutral', 'continue', NULL, '2026-03-18 09:00:23', 0),
(291, 63, 1, 'Neutral', 'continue', NULL, '2026-03-18 09:02:45', 0),
(292, 64, 1, 'Sad', 'chatbot', NULL, '2026-03-18 09:04:02', 0),
(293, 66, 1, 'Neutral', 'continue', NULL, '2026-03-18 09:07:21', 0),
(294, 67, 1, 'Sad', 'chatbot', NULL, '2026-03-18 21:25:01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `section_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `section_name` varchar(150) DEFAULT NULL,
  `section_order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`section_id`, `course_id`, `section_name`, `section_order`) VALUES
(1, 1, 'Introduction to Course', 1);

-- --------------------------------------------------------

--
-- Table structure for table `select_set_games`
--

CREATE TABLE `select_set_games` (
  `select_set_game_id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `items_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`items_json`)),
  `rule` text DEFAULT NULL,
  `correct_set_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`correct_set_json`)),
  `difficulty` enum('easy','medium','hard') DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `select_set_games`
--

INSERT INTO `select_set_games` (`select_set_game_id`, `course_id`, `section_id`, `items_json`, `rule`, `correct_set_json`, `difficulty`, `active`) VALUES
(1, 1, 1, '[\"Python\",\"SQL\",\"Excel\",\"Dog\",\"Car\",\"TensorFlow\"]', 'Select tools used in Machine Learning & Data Science', '[\"Python\",\"SQL\",\"Excel\",\"TensorFlow\"]', 'easy', 1);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Sai Harsha Pabolu', 'saiharsha0501@gmail.com', 'harsha111', '2026-01-22 12:11:38'),
(3, 'murali ', 'murali968@gmail.com', 'murali968', '2026-01-30 09:27:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`article_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `article_progress`
--
ALTER TABLE `article_progress`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_message`
--
ALTER TABLE `chat_message`
  ADD PRIMARY KEY (`chat_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `course_progress`
--
ALTER TABLE `course_progress`
  ADD PRIMARY KEY (`course_progress_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `emotion_logs`
--
ALTER TABLE `emotion_logs`
  ADD PRIMARY KEY (`emotion_log_id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `fill_blanks_games`
--
ALTER TABLE `fill_blanks_games`
  ADD PRIMARY KEY (`fill_blanks_game_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `learning_sessions`
--
ALTER TABLE `learning_sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `section_id` (`section_id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indexes for table `match_flow_games`
--
ALTER TABLE `match_flow_games`
  ADD PRIMARY KEY (`match_flow_game_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `quiz_games`
--
ALTER TABLE `quiz_games`
  ADD PRIMARY KEY (`quiz_game_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `recommendations`
--
ALTER TABLE `recommendations`
  ADD PRIMARY KEY (`recommendation_id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`section_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `select_set_games`
--
ALTER TABLE `select_set_games`
  ADD PRIMARY KEY (`select_set_game_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `article_progress`
--
ALTER TABLE `article_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `chat_message`
--
ALTER TABLE `chat_message`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `course_progress`
--
ALTER TABLE `course_progress`
  MODIFY `course_progress_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `emotion_logs`
--
ALTER TABLE `emotion_logs`
  MODIFY `emotion_log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=659;

--
-- AUTO_INCREMENT for table `fill_blanks_games`
--
ALTER TABLE `fill_blanks_games`
  MODIFY `fill_blanks_game_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `learning_sessions`
--
ALTER TABLE `learning_sessions`
  MODIFY `session_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `match_flow_games`
--
ALTER TABLE `match_flow_games`
  MODIFY `match_flow_game_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_games`
--
ALTER TABLE `quiz_games`
  MODIFY `quiz_game_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `recommendations`
--
ALTER TABLE `recommendations`
  MODIFY `recommendation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=295;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `section_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `select_set_games`
--
ALTER TABLE `select_set_games`
  MODIFY `select_set_game_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `articles_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`);

--
-- Constraints for table `course_progress`
--
ALTER TABLE `course_progress`
  ADD CONSTRAINT `course_progress_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  ADD CONSTRAINT `course_progress_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `emotion_logs`
--
ALTER TABLE `emotion_logs`
  ADD CONSTRAINT `emotion_logs_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `learning_sessions` (`session_id`),
  ADD CONSTRAINT `emotion_logs_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

--
-- Constraints for table `fill_blanks_games`
--
ALTER TABLE `fill_blanks_games`
  ADD CONSTRAINT `fill_blanks_games_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `fill_blanks_games_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`);

--
-- Constraints for table `learning_sessions`
--
ALTER TABLE `learning_sessions`
  ADD CONSTRAINT `learning_sessions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  ADD CONSTRAINT `learning_sessions_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `learning_sessions_ibfk_3` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`),
  ADD CONSTRAINT `learning_sessions_ibfk_4` FOREIGN KEY (`article_id`) REFERENCES `articles` (`article_id`);

--
-- Constraints for table `match_flow_games`
--
ALTER TABLE `match_flow_games`
  ADD CONSTRAINT `match_flow_games_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `match_flow_games_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`);

--
-- Constraints for table `quiz_games`
--
ALTER TABLE `quiz_games`
  ADD CONSTRAINT `quiz_games_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `quiz_games_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`);

--
-- Constraints for table `recommendations`
--
ALTER TABLE `recommendations`
  ADD CONSTRAINT `recommendations_ibfk_1` FOREIGN KEY (`session_id`) REFERENCES `learning_sessions` (`session_id`),
  ADD CONSTRAINT `recommendations_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`);

--
-- Constraints for table `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `sections_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `select_set_games`
--
ALTER TABLE `select_set_games`
  ADD CONSTRAINT `select_set_games_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `select_set_games_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `sections` (`section_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
