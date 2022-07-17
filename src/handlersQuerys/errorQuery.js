const StructResponse = require("../models/response")

const messageErrors = {
  "400": "Favor asegurese de pasar todos los datos de manera correcta",
  "401": "no esta autorizado para acceder",
  "409": "hubo un conflicto al procesar sus datos",
  "500": "error interno del servidor"
}

const textError = (status) => {
  if (status == 400) return messageErrors[status]
  if (status == 401) return messageErrors[status]
  if (status >= 500) return messageErrors["500"]
}
/**
 * @function errorQuery responde al frontEnd el codigo de error con objeto json
 * @param response es el parameteo de las funciones node para responder 
 * @param status codigo de estado de la respuesta
 * @param errorSQL mensaje de error de SQL en caso de que aplique
 * @param msg mensaje de error (parametro no obligatorio)
 */
const errorQuery = (response, status, errorSQL = null, msg) => {
  let messageError= ''

  if (!msg) messageError = textError(status)
  else messageError = msg

  const responseJson = new StructResponse({}, {
    code: status,
    message: messageError,
    errorSQL
  })
  response.status(status).json(responseJson)
}

module.exports = errorQuery
