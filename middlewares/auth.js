exports.isAuth = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  }
  next();
};
