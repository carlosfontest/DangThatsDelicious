const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out! 👋🏽');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'Oops! You must be logged in to go that');
  res.redirect('/login');
};

exports.forgot = async (req, res) => {
  // 1. See if a user with email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    // Aunque no haya usuario, por seguridad no se dice que no hay un user con ese email
    req.flash('error', 'No account with this email exists.');
    return res.redirect('/login');
  }
  // 2. Set reset tokens and expires on their account
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await user.save();
  // 3. Send them an email with the token
  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  await mail.send({
    user,
    filename: 'password-reset',
    subject: 'Password Reset',
    resetURL
  });
  req.flash('success', `You have been emailed a password reset link.`);
  // 4. Redirect to login page
  res.redirect('/login');
};

exports.reset = async (req, res) => {
  const token = req.params.token;
  const user = await User.findOne({ 
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() } // Si el token se expira después de ahora mismo
  });

  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }
  // if the is a user, show the reset password form
  res.render('reset', { title: 'Reset your password' });
};

exports.confirmPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next();
    return;
  }
  req.flash('error', "Passwords do not match");
  res.redirect('back');
};

exports.update = async (req, res) => {
  const token = req.params.token;
  const user = await User.findOne({ 
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() } // Si el token se expira después de ahora mismo
  });

  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }

  const setPassword = promisify(user.setPassword, user); // Método de passport
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  await req.login(updatedUser); // Método de passport
  req.flash('success', '💃🏽 Nice! Your password has been reset! You are now logged in"');
  res.redirect('/');
};
