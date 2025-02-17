const pool = require('../config/database');


const getAllEmployees = async (req, res) => {
  try {
    const [employees] = await pool.query('SELECT * FROM employees');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const [employees] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
    
    if (employees.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(employees[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { name, email, department, salary } = req.body;
    const [result] = await pool.query(
      'INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)',
      [name, email, department, salary]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, salary } = req.body;
    await pool.query(
      'UPDATE employees SET name = ?, email = ?, department = ?, salary = ? WHERE id = ?',
      [name, email, department, salary, id]
    );
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM employees WHERE id = ?', [id]);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,  // Add this
  addEmployee,
  updateEmployee,
  deleteEmployee
};