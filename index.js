require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const { mongoURL } = require('./config/key');

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || mongoURL;
app.set('views', './views');
app.set('view engine', 'ejs');

// for reading body json data
app.use(express.json());

// setting Public folder as static
app.use(express.static('./public'));

// connect to DB
mongoose
  .connect(MONGO_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB Connected....'))
  .catch((err) => console.error(`Failed to connect: ${err}`));

// model register
require('./models/user');
require('./models/note');

// importing routes middleware
// app.use('/api/post', require('./routes/imgRoute'));
app.use('/api/user', require('./routes/authRoute'));
app.use('/api/note', require('./routes/crudRoute'));
app.use('/', require('./routes/defaultRoute'));

// Listening to the port
app.listen(port, () => console.log(`Server running on http://localhost:${port}....`));
