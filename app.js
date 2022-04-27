/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const SERVER_PORT = process.env.PORT || 4000;

require('dotenv').config();

require('./helpers/connenctDB').connect();

const indexRouter = require('./routes/index');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(4000, () => console.log(`Server is running on port ${SERVER_PORT}`));

module.exports = app;
