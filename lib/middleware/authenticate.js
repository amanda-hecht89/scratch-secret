const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  console.log('bad');
  try {
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];
    console.log(cookie, 'cookie');
    if (!cookie) throw new Error('Gotta Sign In!!!');
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
