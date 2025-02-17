-- Add users table to the existing database
USE employee_management;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add some sample users (password will be hashed in the actual implementation)
INSERT INTO users (username, email, password, role) VALUES
    ('admin', 'admin@example.com', 'admin@123', 'admin'),
    ('user1', 'user1@example.com', 'user1@123', 'user');


-- Create the database
CREATE DATABASE IF NOT EXISTS employee_management;
USE employee_management;

-- Create employees table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(255) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add indexes
CREATE INDEX idx_email ON employees(email);
CREATE INDEX idx_department ON employees(department);

INSERT INTO employees (name, email, department, salary) VALUES
    ('John Doe', 'john@example.com', 'Engineering', 75000.00),
    ('Jane Smith', 'jane@example.com', 'Marketing', 65000.00),
    ('Mike Johnson', 'mike@example.com', 'Sales', 60000.00),
    ('Sarah Williams', 'sarah@example.com', 'HR', 55000.00),
    ('David Brown', 'david@example.com', 'Engineering', 80000.00),
    ('Emma Davis', 'emma@example.com', 'Marketing', 62000.00),
    ('Robert Wilson', 'robert@example.com', 'Sales', 58000.00),
    ('Olivia Miller', 'olivia@example.com', 'HR', 57000.00),
    ('William Taylor', 'william@example.com', 'Engineering', 85000.00),
    ('Sophia Anderson', 'sophia@example.com', 'Marketing', 64000.00),
    ('James Thomas', 'james@example.com', 'Sales', 62000.00),
    ('Isabella White', 'isabella@example.com', 'HR', 53000.00),
    ('Mason Martin', 'mason@example.com', 'Engineering', 89000.00),
    ('Lucas Thompson', 'lucas@example.com', 'Marketing', 60000.00),
    ('Charlotte Harris', 'charlotte@example.com', 'Sales', 61000.00),
    ('Benjamin Lee', 'benjamin@example.com', 'HR', 56000.00),
    ('Alexander Scott', 'alexander@example.com', 'Engineering', 87000.00),
    ('Amelia Young', 'amelia@example.com', 'Marketing', 63000.00),
    ('Ethan Nelson', 'ethan@example.com', 'Sales', 59000.00),
    ('Mia Carter', 'mia@example.com', 'HR', 54000.00),
    ('Daniel Baker', 'daniel@example.com', 'Engineering', 91000.00),
    ('Ava Gonzalez', 'ava@example.com', 'Marketing', 67000.00),
    ('Michael Perez', 'michael@example.com', 'Sales', 63000.00),
    ('Emily Wright', 'emily@example.com', 'HR', 52000.00),
    ('Liam Adams', 'liam@example.com', 'Engineering', 93000.00),
    ('Grace Hall', 'grace@example.com', 'Marketing', 66000.00),
    ('Noah King', 'noah@example.com', 'Sales', 61000.00),
    ('Harper Allen', 'harper@example.com', 'HR', 51000.00),
    ('Jacob Moore', 'jacob@example.com', 'Engineering', 94000.00),
    ('Ella Clark', 'ella@example.com', 'Marketing', 68000.00);

