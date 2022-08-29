const createError = require('http-errors')
const { handlerVerifiyData, handlerVerifiyDataUpdate } = require('./utils/handlerVerifiyData')
const { handlerResponse } = require('../../utils/handlerResponse')
const { modelCreateBankUser, modelGetAllBanksUsers, modelGetBankUser, modelUpdateBankUser, modelDeleteBankUser } = require('./banksUsersModel')

const createBanksUsers = (req, res, next) => {
  const data = req.body

  const error = handlerVerifiyData(data)
  if (error) return next(createError(400, error))


  modelCreateBankUser(data)
    .then(bank => {
      const message = 'Banco creado exitosamente'
      handlerResponse(res, bank, 201, message)
    })
    .catch(err => next(createError(500, err)))
}
const getAllBanksUsers = (req, res, next) => {
  const id = parseInt(req.params.idUser, 10)
  if (!id) {
    const message = 'favor pase un id valido en la url'
    next(createError(400, message))
    return
  }

  modelGetAllBanksUsers(id)
    .then(banks => {
      const message = 'Consulta exitosa'
      handlerResponse(res, banks, 200, message)
    })
    .catch(err => createError(500, err))
}
const getBankUser = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (!id) {
    const message = 'favor pase un id valido en la url'
    next(createError(400, message))
    return
  }
  modelGetBankUser(id)
    .then(bank => {
      const message = 'Consulta exitosa'
      handlerResponse(res, bank, 200, message)
    })
    .catch(err => next(createError(500, err)))
}
const updateBankUser = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  const data = req.body

  const error = handlerVerifiyDataUpdate(data, id)
  if (error) return next(createError(400, error))

  modelUpdateBankUser(id, data)
    .then(bank => {
      const message = 'Banco actualizado correctamente'
      handlerResponse(res, bank, 200, message)
    })
    .catch(err => next(createError(500, err)))

}
const deleteBankUser = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (!id) {
    const message = 'favor pase un id valido en la url'
    next(createError(400, message))
    return
  }
  
  modelDeleteBankUser(id)
    .then(() => {
      const message = 'Banco eliminado exitosamente'
      handlerResponse(res, null, 200, message)
    })
    .catch(err => next(createError(500, err)))
}

module.exports = {
  createBanksUsers,
  getAllBanksUsers,
  getBankUser,
  updateBankUser,
  deleteBankUser
}
