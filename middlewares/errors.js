const createError = require('http-errors')

const error404 = (req, res, next) => {
  const error = {
    path: req.path,
    method: req.method,
    msg: 'ruta o metodo invalido'
  }
    next(createError(404, error))
}

const customError = (error) => {
  if (!error.code) return error

  switch (error.code) {
    case "ER_DUP_ENTRY":
      return {
        ...error,
        message: `${error.table} duplicado (a)`,
        status: 400
      }
    case "ER_NO_SUCH_TABLE":
      return {
        ...error,
        message: `La tabla ${error.table} no existe`,
      }
    case "ER_ROW_IS_REFERENCED_2":
      return {
        ...error,
        message: `No puede eliminar el elemento, debido a que esta siendo usado`,
        status: 400
      }
    default:
      return {
        ...error,
        message: error.message || 'Error interno, intenta más tarde',
      }
  }
}


const handlerErrors = (err, req, res, next) => {
    const error = customError(err)
    res.status(error.status || 500)
    res.json(error)
}

module.exports = {
    error404,
    handlerErrors
}
