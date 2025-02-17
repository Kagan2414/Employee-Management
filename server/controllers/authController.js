const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        const [existingUsers] = await pool.query(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Insert new user
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Get user
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        
        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        
        const user = users[0];
        
        // Check if the password is already hashed (starts with $2b$ for bcrypt)
        let validPassword;
        if (user.password.startsWith('$2b$') || user.password.startsWith('$2a$')) {
            // Password is hashed, use bcrypt compare
            validPassword = await bcrypt.compare(password, user.password);
        } else {
            // Password is not hashed, do direct comparison (ONLY FOR DEVELOPMENT/TESTING)
            validPassword = (password === user.password);
        }
        
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        
        // Create token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };