const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const {
  
  loginUser, signupUser

} = require('../controllers/authusers')
const authenticate = require('../utils/authUtils');

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

// User routes
router.post('/', authenticate, createUser);
router.post('/signup', signupUser);
router.post('/login', authenticate, loginUser);
router.get('/', authenticate, getUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

module.exports = router;
