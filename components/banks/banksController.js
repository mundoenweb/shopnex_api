
const createError = require('http-errors')
const { handlerVerifiyData, handlerVerifiyDataUpdate } = require('./utils/handlerVerifiyData')
const { handlerResponse } = require('../../utils/handlerResponse')
const { modelCreateBank, modelGetAllBanks, modelGetBank, modelUpdateBank, modelDeleteBank } = require('./banksModel')

const createBank = (req, res, next) => {
  const data = req.body

  const errorData = handlerVerifiyData(data)
  if (errorData) return next(createError(400, errorData))

  modelCreateBank(data)
    .then(bank => {
      const message = 'Banco creado exitosamente'
      handlerResponse(res, bank, 200, message)
    })
    .catch(err => next(createError(500, err)))
}
const getAllBanks = (req, res, next) => {
  modelGetAllBanks()
    .then(banks => {
      const message = 'Consulta exitosa'
      handlerResponse(res, banks, 200, message)
    })
    .catch(err => next(createError(500, err)))
}
const getBank = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (!id) {
    const message = 'favor pase un id valido en la url'
    next(createError(400, message))
    return
  }
  modelGetBank(id)
    .then(bank => {
      const message = 'Consulta exitosa'
      handlerResponse(res, bank, 200, message)
    })
    .catch(err => next(createError(500, err)))

}
const updateBank = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  const data = req.body

  const errorData = handlerVerifiyDataUpdate(data)
  if (errorData) return next(createError(400, errorData))

  modelUpdateBank(id, data)
    .then(bank => {
      const message = `Banco actualizado con exito`
      handlerResponse(res, bank, 200, message)
    })
    .catch(err => next(createError(500, err)))
}
const deleteBank = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (!id) {
    const message = 'favor pase un id valido en la url'
    next(createError(400, message))
    return
  }

  modelDeleteBank(id)
  .then(() => {
    const message = 'Banco eliminado exitosamente'
    handlerResponse(res, null, 200, message)
  })
  .catch(err => next(createError(500, err)))
}

module.exports = {
  getAllBanks,
  getBank,
  createBank,
  updateBank,
  deleteBank
}
