const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportMiddleware = require('../services/passport');
const { signIn } = require('../contollers/auth');

const reqSignin = passport.authenticate('local', { session: false });

router.post('/', reqSignin, signIn);

module.exports = router;
