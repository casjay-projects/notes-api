const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const Note = mongoose.model('Note');
const protected = require('../middleware/verifyToken');

// fetch all notes
router.get('/all', protected, (req, res) => {
  Note.find({ postedBy: req.user._id })
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.sendStatus('500');
      console.log(err);
    });
});

// get routes
router.get('/*', (req, res) => {
  const serverAdress = `${req.protocol}://${req.headers.host}/api/notes`;
  res.setHeader('Content-Type', 'application/json');
  try {
    res.send(
      JSON.stringify({
        Greetings: ' 🥞 🐛 💜 Welcome to my Notes Server 💜 🐛 🥞 ',
        All: `GET ${serverAdress}/all`,
        new: `POST ${serverAdress}/new`,
        delete: `DELETE ${serverAdress}/delete/:id`,
        update: `UPDATE ${serverAdress}/update/:id`,
      }),
    );
  } catch (error) {
    res.send('An error has occurred');
  }
});

// add new note
router.post('/new', protected, (req, res) => {
  const { note } = req.body;
  const myNote = new Note({
    note,
    postedBy: req.user,
  });
  myNote
    .save()
    .then((result) => {
      res.json({ Note: result });
    })
    .catch((err) => {
      res.sendStatus('500');
      console.log(err);
    });
});

// update Note by id
router.put('/update/:id', protected, (req, res) => {
  const Id = req.params.id;
  const note = { $set: { note: req.body.note } };
  Note.findByIdAndUpdate({ _id: Id }, note)
    .then((data) => {
      res.json('note  updated successfully ');
    })
    .catch((err) => {
      res.sendStatus('500');
      console.log(err);
    });
});

// delete Note by id
router.delete('/delete/:id', protected, (req, res) => {
  Note.findOne({ _id: req.params.id })
    .then((data) => {
      data.remove();
      res.json(` item deleted successfully `);
    })
    .catch((err) => {
      res.sendStatus('500');
      console.log(err);
    });
});

// delete all items of a particular user
router.delete('/clear', protected, (req, res) => {
  // Note.deleteMany({}).then(result=>{
  Note.find({ postedBy: req.user._id })
    .remove()
    .then((result) => {
      res.json({ Note: result });
    })
    .catch((err) => {
      res.sendStatus('500');
      console.log(err);
    });
});

module.exports = router;
