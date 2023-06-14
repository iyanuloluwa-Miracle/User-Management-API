// controllers/users.js
const db = require('../models/db');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/authUtils');
const bcrypt = require('bcrypt');

// Get all users
exports.getUsers = (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json(result);
  });
};

exports.createUser = (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create the user in the database
  const sql = `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`;
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // Generate a token for the newly registered user
    const token = generateToken({ id: result.insertId });

    return res.status(201).json({ message: 'User created successfully', token });
  });
};


// Get a user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(result[0]);
  });
};

// Update a user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const sql = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
  db.query(sql, [username, email, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User updated successfully' });
  });
};

// Delete a user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  });
};
