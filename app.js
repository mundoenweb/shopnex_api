require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const connection = require('./src/db/connection')
const { verifyToken } = require('./src/middlewares/verifyToken')

// module routers
const routerLogin = require('./src/routes/session')
const routerRoles = require('./src/routes/roles')
const routerSubscriptions = require('./src/routes/subscriptions')
const routerUsers = require('./src/routes/users')
const routerBanks = require('./src/routes/banks')
const routerBanksUsers = require('./src/routes/banksUsers')
const routerNews = require('./src/routes/news')
const routerTypeMovement = require('./src/routes/typeMovement')
const routerTasks = require('./src/routes/tasks')
const routerProfits = require('./src/routes/profits')
const routerMovements = require('./src/routes/movements')
const routerFiles = require('./src/routes/images')

const app = express();
app.set('title', 'aplicación realiza por tuemprende.com')

// middlewares
app.use(cors())
app.use(fileUpload())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(routerLogin)
app.use(routerFiles)


app.use(routerRoles)
app.use(routerSubscriptions)
app.use(routerUsers)
app.use(routerBanks)
app.use(routerBanksUsers)
app.use(routerNews)
app.use(routerTypeMovement)
app.use(routerTasks)
app.use(routerProfits)
app.use(routerMovements)

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
