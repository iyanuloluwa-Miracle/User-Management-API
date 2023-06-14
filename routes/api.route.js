const express = require('express');
const router = express.Router();
const authControl = require('../controllers/authUser');
const userController = require('../controllers/users')
const { authenticateToken } = require('../utils/authUtils');

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});


// Authentication
router.post('/signup', authControl.signupUser);
router.post('/login', authControl.loginUser);

// User routes
router.post('/', authenticateToken, userController.createUser);
router.get('/users', authenticateToken, userController.getUsers);
router.get('/:id',authenticateToken, userController.getUserById);
router.put('/:id',authenticateToken, userController.updateUser);
router.delete('/:id',authenticateToken, userController.deleteUser);





module.exports = router;
