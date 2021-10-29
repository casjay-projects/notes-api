const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const noteSchema = new mongoose.Schema({
  note: {
    type: String,
  },
  imgname: {
    type: String,
  },
  postedBy: {
    type: ObjectId,
    ref: 'User',
  },
});

mongoose.model('Note', noteSchema);
