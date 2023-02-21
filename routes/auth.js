const express = require('express');
const { checkNotAuthenticated } = require('../middleware/auth');
const { jwtLogin } = require('../controllers/auth');

const router = express.Router();
router.get('/login/', checkNotAuthenticated, (req, res) => {
  res.render('auth/login.ejs', { title: 'Login' });
});

router.post('/login/', jwtLogin);

module.exports = router;
