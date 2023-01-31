const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// const getUserByEmail = require('../utils/userDBUtils');

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    // console.log(email, password, '*****************');
    const user = await getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: 'No user with that email found.' });
    }
    console.log(user, '*****************');

    try {
      if (await bcrypt.compare(password, user.password)) {
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
  passport.deserializeUser(async (id, done) => done(null, await getUserById(id)));
}

module.exports = initialize;
