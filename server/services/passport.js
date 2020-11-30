const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const jwtSecret = process.env.JWT_SECRET;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Local strategy
const localLogin = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false);
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);

// Setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: jwtSecret,
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = User.findById(payload.sub);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

// Use the strategy
passport.use(jwtLogin);
passport.use(localLogin);
