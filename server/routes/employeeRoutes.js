const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  getAllEmployees,
  getEmployeeById,  
  addEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

router.get('/', getAllEmployees);  // Public route
router.get('/:id', authenticateToken, getEmployeeById);
router.post('/', authenticateToken, addEmployee);
router.put('/:id', authenticateToken, updateEmployee);
router.delete('/:id', authenticateToken, deleteEmployee);

module.exports = router;