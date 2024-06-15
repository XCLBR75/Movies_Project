const db = require('../db');

// Register a new user
const registerUser = (req, res) => {
    const { username, password, email, phone } = req.body;
    const query = 'INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)';
    db.query(query, [username, password, email, phone], (err, results) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Failed to register user' });
            return;
        }
        res.status(201).json({ message: 'User registered successfully', id: results.insertId });
    });
};

// Login a user
const loginUser = (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error logging in user:', err);
            res.status(500).json({ error: 'Failed to login user' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid username or password' });
            return;
        }
        req.session.user = results[0]; // Set the user in the session
        res.status(200).json({ message: 'Login successful', user: results[0] });
    });
};

// Check if a user is logged in
const checkLoggedIn = (req, res) => {
    if (req.session.user) {
        res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        res.status(200).json({ loggedIn: false });
    }
};

// Logout a user
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error logging out user:', err);
            res.status(500).json({ error: 'Failed to logout user' });
            return;
        }
        res.clearCookie('sid');
        res.status(200).json({ success: true, message: 'Logout successful' });
    });
};

// Check if the logged-in user is an admin
const checkAdmin = (req, res) => {
    if (!req.session.user) {
        res.status(401).json({ loggedIn: false, message: 'Not logged in' });
        return;
    }

    const userId = req.session.user.id_user;
    const query = `
        SELECT ut.UT_roll 
        FROM users u 
        JOIN users_type ut ON u.ut_id = ut.ut_id 
        WHERE u.id_user = ?`;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error checking admin status:', err);
            res.status(500).json({ error: 'Failed to check admin status' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'User role not found' });
            return;
        }
        const isAdmin = results[0].UT_roll === 'admin';
        res.status(200).json({ isAdmin });
    });
};

module.exports = { registerUser, loginUser, checkLoggedIn, logoutUser, checkAdmin };
