const router = require('express').Router();
const {
  register,
  login,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/user', protect, getUser);

router.get('/logout', logout);

router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

module.exports = router;
