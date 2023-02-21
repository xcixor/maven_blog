function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/blog/login/');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

function checkIsAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isSuperUser) {
    return next();
  }
  res.redirect('/blog/login/');
}

module.exports = { checkAuthenticated, checkNotAuthenticated, checkIsAdmin };
