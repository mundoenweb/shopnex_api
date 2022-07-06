// modulos
const express = require('express')
const connection = require('./db/connection')
const StructResponse = require('./models/response')
require('dotenv').config()

// module routers
const routerLogin = require('./routes/login/login')

// creando app
const app = express()

// settings
app.set('title', 'aplicación realiza por tuemprende.com')
app.set('port', process.env.PORT || 3467)
const port = app.get('port')

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// rutas
app.use(routerLogin)



// levantando servidor
app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`)
})
