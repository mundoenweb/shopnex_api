const createError = require('http-errors')
const { handlerResponse } = require('../../utils/handlerResponse')
const { handlerVerifiyData, handlerVerifiyDataUpdate } = require('./utils/handlerVerifiyData')
const queryByParam = require('../../utils/querys/queryByParam')
const { modelCreateRole, modelGetAllRoles, modelGetRole, modelUpdateRole, modelDeleteRol } = require('./rolesModel')

const createRole = (req, res, next) => {
  const data = req.body
  
  const error = handlerVerifiyData(data)
  if (error) return next(createError(400, error))

  modelCreateRole(data)
    .then(rol => {
      const message = 'Rol creado con exito'
      handlerResponse(res, rol, 201, message)
    })
    .catch(err => next(createError(500, err)))
}
const getAllRoles = (req, res, next) => {
  modelGetAllRoles()
  .then(roles => {
    const message = 'Consulta exitosa'
    handlerResponse(res, roles, 200, message)
  })
  .catch(err => next(createError(500, err)))
}
const getRole = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (!id) {
    const message = 'favor pase un id valido en la url'
    next(createError(400, message))
    return
  }
  modelGetRole(id)
  .then(role => {
    const message = 'Consulta exitosa'
    handlerResponse(res, role, 200, message)
  })
  .catch(err => next(createError(500, err)))
}

const updateRole = (req, res, next) => {
  const data = req.body
  const id = parseInt(req.params.id, 10)

  const error = handlerVerifiyDataUpdate(data, id)
  if (error) return next(createError(400, error))

  modelUpdateRole(id, data)
    .then(rol => {
      const message = 'Rol actualizado con exito'
      handlerResponse(res, rol, 200, message)
    })
    .catch(err => next(createError(500, err)))
}

const deleteRol = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (!id) {
    const message = 'favor pase un id valido en la url'
    next(createError(400, message))
    return
  }

  modelDeleteRol(id)
  .then(() =>{
    const message = 'Rol eliminado con exito'
    handlerResponse(res, null, 200, message)
  })
  .catch(err => {
    const message = 'Error al eliminar el rol'
    next(createError(500, {...err, message}))
  })
}

module.exports = {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  deleteRol
}
