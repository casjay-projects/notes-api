const path = require('path');
const router = require('express').Router();

const publicFolder = path.join(__dirname, '../public');

router.get('/', (req, res, next) => {
  res.sendFile(`${publicFolder}/index.html`).catch((err) => {
    res.sendStatus('500');
    console.log(err);
  });
});

router.get('/help.html', (req, res, next) => {
  res.sendFile(`${publicFolder}/help.html`).catch((err) => {
    res.sendStatus('500');
    console.log(err);
  });
});

router.get('/about.html', (req, res, next) => {
  res.sendFile(`${publicFolder}/about.html`).catch((err) => {
    res.sendStatus('500');
    console.log(err);
  });
});

router.get('/api', (req, res) => {
  const serverAdress = `${req.protocol}://${req.headers.host}/api/user`;
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
