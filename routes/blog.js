const express = require('express');
const passport = require('passport');
const { checkNotAuthenticated, checkAuthenticated } = require('../middleware/auth');
const { getPosts } = require('../services/postService');
const { StatusCodes } = require('../utils/httpStatusCodes');

const router = express.Router();

router.get('', checkAuthenticated, (req, res) => {
  let posts;
  const getResponse = getPosts();
  if (res.statusCode === StatusCodes.OK) {
    posts = getResponse.response;
  }
  res.render('index', { title: 'Blog', user: req.user.email, posts });
});

router.get('/blog/login/', checkNotAuthenticated, (req, res) => {
  res.render('auth/login.ejs', { title: 'Login' });
});

router.post('/blog/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/blog/login/',
  failureFlash: true
}));

router.delete('/blog/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    return res.redirect('/blog/login/');
  });
});

module.exports = router;
