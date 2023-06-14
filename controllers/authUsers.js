// Login a user
const bcrypt = require('bcrypt');
const db = require('../models/db');

exports.signupUser = (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
      db.query(insertUserQuery, [email, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        // Generate a token for the newly registered user
        const token = jwt.sign({ id: result.insertId }, 'your_secret_key', {
          expiresIn: '1h',
        });

        return res.status(201).json({ token });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
  
    db.query(sql, [email], async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const user = result[0];
  
      try {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
  
        const token = jwt.sign({ id: user.id }, 'your_secret_key', {
          expiresIn: '1h',
        });
  
        return res.status(200).json({ token });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
};