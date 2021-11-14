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

module.exports = router;
