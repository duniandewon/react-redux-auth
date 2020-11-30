const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportMiddleware = require('../services/passport');

const reqAuth = passport.authenticate('jwt', { session: false });

const { signUp } = require('../contollers/users');

/**
 * @route   /api/users
 * @method  GET
 */

router.get('/', reqAuth, (req, res, next) => {
  res.send("Hello! You're authenticated.");
});

/**
 * @route   /api/users
 * @method  POST
 */

router.post('/', signUp);

module.exports = router;
