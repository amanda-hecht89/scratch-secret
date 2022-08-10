module.exports = async (req, res, next) => {
  try {
    if (!req.user)
      throw new Error('You shall not pass!!!');
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
