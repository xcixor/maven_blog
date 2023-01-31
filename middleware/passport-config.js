const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getUserByEmail, getUserById } = require('../utils/userDBUtils');

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    const user = (await getUserByEmail(email)).response;
    if (user == null) {
      return done(null, false, { message: 'No user with that email found.' });
    }

    try {
      if (bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, { message: 'Password incorrect.' });
    } catch (error) {
      return done(error);
    }
  };
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => done(null, (await getUserById(id)).response));
}

module.exports = initialize;
