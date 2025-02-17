# Employee Management System

## Overview
The Employee Management System is a full-stack web application designed to efficiently manage employee records. It provides features such as adding new employees, updating records, viewing records, and deleting employee details.

## Prerequisites
Ensure you have the following installed before running the project:
-React
- Node.js
- MySQL Database

## Setup Instructions

### 1. Database Setup
- Create the database using the provided schema file (`models\db.sql`).
- Import the schema into your MySQL server.
- Update the database connection details in the server configuration file if necessary.

### 2. Server Setup
Navigate to the `server` directory and run the following commands:
```sh 
npm install
npm run dev
```
This will install dependencies and start the backend server.

### 3. Client Setup
Navigate to the `client` directory and run:
```sh
npm install
npm start
```
This will install dependencies and start the frontend development server.

The application will be available at http://localhost:5000 and provide direct access to all employee management features with authentication.

## Login Credentials 
The login credentials for the Employee Details are as follows:
```sh
Email : admin@example.com
Password : admin123
```


