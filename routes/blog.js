const express = require('express');
const passport = require('passport');
const { checkNotAuthenticated } = require('../middleware/auth');
const { getCategories } = require('../services/categoryService');

const router = express.Router();

router.get('', async (req, res) => {
  const { categories } = await getCategories();
  res.render('index', { title: 'Blog', categories });
});

router.get('/blog/login/', checkNotAuthenticated, (req, res) => {
  res.render('auth/login.ejs', { title: 'Login' });
});

router.post('/blog/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/blog/login/',
  failureFlash: true,
  successFlash: true
}));

router.delete('/blog/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    return res.redirect('/blog/login/');
  });
});

module.exports = router;
