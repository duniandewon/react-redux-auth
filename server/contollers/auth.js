const jwt = require('jwt-simple');
const jwtSecret = process.env.JWT_SECRET;

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, jwtSecret);
}

module.exports = {
  signIn: (req, res, next) => {
    res.json({ token: tokenForUser(req.user) });
  },
};
