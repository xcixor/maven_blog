const express = require('express');
const passport = require('passport');
const { checkNotAuthenticated } = require('../middleware/auth');

const router = express.Router();
router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('auth/login.ejs', { title: 'Login' });
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login/',
  failureFlash: true
}));

router.delete('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    return res.redirect('/auth/login');
  });
});

module.exports = router;
