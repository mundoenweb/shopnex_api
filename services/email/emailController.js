const { HandleEmailAutorization } = require("./utils/HandleEmailAutorization")
const createError = require('http-errors')
const { handlerResponse } = require("../../utils/handlerResponse")

const emailReserve = async (req, res, next) => {
  const data = req.body
  const transporter = await HandleEmailAutorization()

  const objetMail = {
    from: `"Reserva: ${data.name}" <reservas@charlizespa.com>`,
    to: "reservas@charlizespa.com, charlizelacasadelmasaje@gmail.com, mundoenweb@gmail.com",
    subject: "Reserva",
    text: "se ha realizado una reserva\nhttps://cms.charlizespa.com",
  }

  transporter.sendMail(objetMail)
    .then(() => {
      const message = 'corre enviado con exito'
      handlerResponse(res, null, 200, message)
    })
    .catch(err => {
      next(createError(500, err))
    })
}

const emailWorker = async (req, res, next) => {
  const data = req.body
  console.log(data)
  const transporter = await HandleEmailAutorization()

  const bodyHtml = `
    <p>Nombre: ${data.name} <br/>
    DNI: ${data.dni} <br/>
    Teléfono: <a href="tel:+51${data.phone}">
      ${data.phone}
    </a> <br/>
    Correo: ${data.email}</p>
    <p>Mensaje: ${data.message}</p>
  `

  const objetMail = {
    from: `"${data.name}" <reservas@charlizespa.com>`,
    to: "reservas@charlizespa.com, charlizelacasadelmasaje@gmail.com, mundoenweb@gmail.com",
    subject: "Solicitud de empleo",
    html: bodyHtml,
  }

  transporter.sendMail(objetMail)
    .then(() => {
      const message = 'corre enviado con exito'
      handlerResponse(res, null, 200, message)
    })
    .catch(err => {
      next(createError(500, err))
    })
}

module.exports = {
  emailReserve,
  emailWorker
}
