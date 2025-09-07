const express = require('express');
const User = require('../models/user.models');
const router = express.Router();

// Signup page
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up' });
});

// Signup handler
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.create({ username, password });
    res.redirect('/auth/signin');
  } catch (err) {
    res.render('signup', { error: 'User already exists', title: 'Sign Up' });
  }
});

// Signin page
router.get('/signin', (req, res) => {
  res.render('signin', { title: 'Sign In' });
});

// Signin handler
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.render('signin', { error: 'Invalid credentials', title: 'Sign In' });
  }
  req.session.userId = user._id;
  res.redirect('/list');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/signin');
  });
});

module.exports = router;