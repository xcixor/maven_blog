const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const { getUserByEmail, getUserById } = require('../utils/userDBUtils');

const opts = {
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt')
};
const UserModel = require('../models/userModel');

// function initialize(passport) {
passport.use(new JwtStrategy(opts, ((jwtPayload, done) => {
  UserModel.findOne({ _id: jwtPayload.user.id }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
})));
// }

// module.exports = initialize;
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
