// modulos
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const connection = require('./src/db/connection')
const { verifyToken } = require('./src/middlewares/verifyToken')
require('dotenv').config()

// module routers
const { usersCreate } = require('./src/controller/users/users')
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

// creando app
const app = express()
// const api = '/api/v1'
const api = ''

// settings
app.set('title', 'aplicación realiza por tuemprende.com')
app.set('port', 3467)
// const port = app.get('port')
const port = 3467

// middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(fileUpload())

app.use(api, routerLogin)
app.post(`${api}/register`, usersCreate)

app.use(verifyToken)
app.use(api, routerRoles)
app.use(api, routerSubscriptions)
app.use(api, routerUsers)
app.use(api, routerBanks)
app.use(api, routerBanksUsers)
app.use(api, routerNews)
app.use(api, routerTypeMovement)
app.use(api, routerTasks)
app.use(api, routerProfits)
app.use(api, routerMovements)

// levantando servidor
app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`)
})
