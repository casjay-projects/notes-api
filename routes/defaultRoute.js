const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.sendFile('index.html').catch((err) => {
    res.sendStatus('500');
    console.log(err);
  });
});

router.get('/help.html', (req, res, next) => {
  res.sendFile('help.html').catch((err) => {
    res.sendStatus('500');
    console.log(err);
  });
});

router.get('/about.html', (req, res, next) => {
  res.sendFile('about.html').catch((err) => {
    res.sendStatus('500');
    console.log(err);
  });
});

module.exports = router;
