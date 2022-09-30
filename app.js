require('dotenv').config()
const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { error404, handlerErrors } = require('./middlewares/errors');
const router = require('./routes/index')
const connection = require('./config/connection');

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
