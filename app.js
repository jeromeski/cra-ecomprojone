const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

// import routes
const authRoutes = require('./routes/auth');

// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connected'))
  .catch(err => {
    console.log(err);
  });

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`);
});

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// routes middleware
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(` Server is running on port ${port}`);
});
