// modulos
const express = require('express')
const connection = require('./db/connection')
const StructResponse = require('./models/response')

// creando app
const app = express()

// settings
app.set('title', 'aplicación realiza por tuemprende.com')
app.set('port', process.env.PORT || 3467)
const port = app.get('port')

// middlewares
app.use(express.urlencoded({ extended: false }))

// rutas
app.get('/', (request, rsp) => {

  const responJson = new StructResponse({
    code: 200,
    message: "consulta exitosa"
  })

  rsp.status(200).json(responJson)
})



// levantando servidor
app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`)
})
