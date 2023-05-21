-- Create database, Create user and Grant privileges

CREATE DATABASE IF NOT EXISTS cms_dev_db;
CREATE USER IF NOT EXISTS 'cms_dev'@'localhost' IDENTIFIED BY 'cms_dev_pwd';
GRANT ALL PRIVILEGES ON `cms_dev_db`.* TO 'cms_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'cms_dev'@'localhost';
FLUSH PRIVILEGES;
