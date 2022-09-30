const createError = require('http-errors')
const { handlerResponse } = require('../../utils/handlerResponse')
const { modelCreateTask, modelGetAllTasks, modelGetTask, modelUpdateTask, modelDeleteTask } = require('./tasksModel')
const { handlerVerifiyData, handlerVerifiyDataUpdate } = require('./utils/handlerVerifiyData')

const createTask = (req, res, next) => {
  const data = req.body

  const error = handlerVerifiyData(data)
  if (error) return next(createError(400, error))

  modelCreateTask(data)
    .then(task => {
      const message = 'tarea creada con exito'
      handlerResponse(res, task, 201, message)
    })
    .catch(err => next(createError(500, err)))

}
const getAllTasks = (req, res, next) => {
  modelGetAllTasks()
    .then(tasks => {
      const message = 'consulta exitosa'
      handlerResponse(res, tasks, 200, message)
    })
    .catch(err => next(createError(500, err)))
}
const getTask = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (!id) {
    const message = 'favor pase un id valido en la url'
    next(createError(400, message))
    return
  }

  modelGetTask(id)
    .then(task => {
      const message = 'consulta exitosa'
      handlerResponse(res, task, 200, message)
    })
    .catch(err => next(createError(500, err)))
}
const updateTask = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  const data = req.body

  const error = handlerVerifiyDataUpdate(data, id)
  if (error) return next(createError(400, error))

  modelUpdateTask(id, data)
    .then(task => {
      const message = 'tarea actualizada con exito'
      handlerResponse(res, task, 200, message)
    })
    .catch(err => next(createError(500, err)))

}
const deleteTask = (req, res, next) => {
  const id = parseInt(req.params.id, 10)
  if (!id) {
    const message = 'favor pase un id valido en la url'
    next(createError(400, message))
    return
  }

  modelDeleteTask(id)
  .then(() => {
    const message = 'tarea eliminada con exito'
    handlerResponse(res, [], 200, message)
  })
  .catch(err => next(createError(500, err)))
}

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask
}
