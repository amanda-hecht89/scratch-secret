module.exports = async (req, res, next) => {
  try {
    if (!req.user || req.user.email !== 'admin')
      throw new Error('You shall not pass!!!');
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
