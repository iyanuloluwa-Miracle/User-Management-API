const express = require('express');
const router = express.Router();
const authControl = require('../controllers/authUser');
const userController = require('../controllers/users')
const { authenticateToken } = require('../utils/authUtils');

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

// User routes
router.post('/', userController.createUser);
router.post('/signup', authControl.signupUser);
router.post('/login', authControl.loginUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id',  userController.updateUser);
router.delete('/:id', userController.deleteUser);





module.exports = router;
