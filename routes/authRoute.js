const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = mongoose.model('User');
const { JWT_SECRET } = require('../config/key');
const { registerValidation, loginValidation } = require('../validation');

// Routers
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // Validating during registration
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({ error: 'user already exists with that email' });
    }
    bcrypt.hash(password, 12).then((hashedpassword) => {
      const user = new User({
        email,
        password: hashedpassword,
        name,
      });
      user
        .save()
        .then((user) => {
          // res.json({ user: result });
          res.json({ message: 'registerd successfully' });
        })
        .catch((err) => {
          console.log(err);
          res.json({ error: err });
        });
    });
  });
});

// Log in
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) return res.status(422).json({ error: ' Email is not found ' });
    // checking the password is correct or not
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          res.json({ message: 'successfully Logged in', 'Auth Token': token });
          res.header('auth-token', token).send(token);
        } else {
          return res.status(422).json({ error: 'Invalid password !!' });
        }
      })
      .catch((err) => {
        res.json({ error: err });
      });
  });
});

module.exports = router;
