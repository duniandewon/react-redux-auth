const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const jwtSecret = process.env.JWT_SECRET;

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, jwtSecret);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Please enter an email and or password' });
    }
    try {
      // See if a user with given email exist
      let user = await User.findOne({ email });
      // if user exist return an error
      if (user) {
        return res.status(422).json({ error: 'Email is in uses' });
      }
      // if user does not exist create new user
      user = new User({ email, password });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // respond to request
      return res.status(200).json({
        status: 200,
        success: true,
        data: { email, token: tokenForUser(user) },
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
};
