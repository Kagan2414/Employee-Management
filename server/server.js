const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');
const authController = require('./controllers/authController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes
app.post('/api/auth/login', authController.login);
app.post('/api/auth/register', authController.register);

// Protected routes
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});