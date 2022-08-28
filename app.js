require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const connection = require('./config/connection');
const { error404, handlerErrors } = require('./middlewares/errors');
const router = require('./routes/index')

const app = express();
app.set('title', 'aplicación realiza por tuemprende.com')


// middlewares
app.use(cors())
app.use(fileUpload())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routes
app.use(router);
app.use(error404);
app.use(handlerErrors);

module.exports = app;
