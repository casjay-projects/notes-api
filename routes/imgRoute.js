const express = require('express');
const mongoose = require('mongoose');

const Note = mongoose.model('Note');
const router = express.Router();
const { upload, uploadMultiple } = require('../storage');
const protected = require('../middleware/verifyToken');

// uploading single image
router.post('/upload', protected, (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) {
      res.json({ msg: 'error : no file selected' });
    } else {
      const imagefile = req.file.filename;
      const imageDetails = new Note({
        imgname: imagefile,
        postedBy: req.user,
      });
      imageDetails.save((err, data) => {
        if (err) throw err;
        res.json({
          msg: 'File Uploaded Successfully...',
          filepath: `uploads/${req.file.filename}`,
        });
      });
    }
  });
});

// uploading multiple images together

// 1..arrays(fieldname[, max_count]) : upload.array("myImage",4)
// 2.any() - upload.any("myImage")

router.post('/upload/multiple', protected, (req, res) => {
  uploadMultiple(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });

    if (!req.files) {
      res.json({ error: 'no file selected' });
    } else {
      console.log(req.files);
      // res.send([req.files[i].filename])
      const imagefile = [];
      for (let i = 0; i < req.files.length; i++) {
        const val = req.files[i].filename;
        imagefile.push(val);
        // res.send(imagefile)
        const imageDetails = new Note({
          imgname: imagefile[i],
          postedBy: req.user,
        });

        imageDetails.save((err, data) => {
          if (err) throw err;
        });
      }
      res.json({
        msg: 'Files Uploaded Successfully...',
      });
    }
  });
});

module.exports = router;
