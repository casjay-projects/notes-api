/* eslint-disable no-dupe-keys */
const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = mongoose.model('User');
const { JWT_SECRET } = require('../config/key');
const { registerValidation, loginValidation } = require('../validation');

// Routers
router.get('/register', (req, res) => {
  const serverAdress = `//${req.headers.host}/api/user`;
  res.setHeader('Content-Type', 'application/json');
  try {
    res.send(
      JSON.stringify({
        Greetings: ' 🥞 🐛 💜 Welcome to my Notes Server 💜 🐛 🥞 ',
        Signup: `Send a POST request to ${serverAdress}/register `,
        name: 'YourName',
        email: 'YourEmail',
        password: 'YourPassWord',
      }),
    );
  } catch (error) {
    res.send('An error has occurred');
  }
});

router.get('/login', (req, res) => {
  const serverAdress = `//${req.headers.host}/api/user`;
  res.setHeader('Content-Type', 'application/json');
  try {
    res.send(
      JSON.stringify({
        Greetings: ' 🥞 🐛 💜 Welcome to my Notes Server 💜 🐛 🥞 ',
        Signup: `Send a POST request to ${serverAdress}/login `,
        email: 'YourEmail',
        password: 'YourPassWord',
      }),
    );
  } catch (error) {
    res.send('An error has occurred');
  }
});

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

router.get('/', (req, res) => {
  const serverAdress = `//${req.headers.host}/api/user`;
  res.setHeader('Content-Type', 'application/json');
  try {
    res.send(
      JSON.stringify({
        Greetings: ' 🥞 🐛 💜 Welcome to my Notes Server 💜 🐛 🥞 ',
        Signup: `Send a POST request to ${serverAdress}/register `,
        name: 'YourName',
        email: 'YourEmail',
        password: 'YourPassWord',
      }),
    );
  } catch (error) {
    res.send('An error has occurred');
  }
});

module.exports = router;
