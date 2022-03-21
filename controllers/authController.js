const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');

exports.registerGet = (req, res, next) => {
  res.render('admin/auth_form', { title: 'Sign Up' });
};

exports.registerPost = (req, res, next) => {
  bcrypt.hash(req.body.password, 12, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/myShop');
    });
  });
};

exports.loginGet = (req, res, next) => {
  res.render('admin/auth_form', { title: 'Login' });
};

exports.loginPost = passport.authenticate('local', {
  successRedirect: '/myShop',
  failureRedirect: '/auth/login',
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/myShop');
};
