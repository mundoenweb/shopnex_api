const connection = require('../../db/connection')
const errorQuery = require('../../handlersQuerys/errorQuery')
const queryByParamID = require('../../handlersQuerys/queryByParamID')
const StructResponse = require('../../models/response')

const getTasks = (req, res) => {
  const sql = 'SELECT * FROM tasks'

  connection.query(sql, (err, result) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const banks = new StructResponse({
      code: 200,
      message: "consulta exitosa"
    }, {}, result)
    res.status(200).json(banks)
  })
}
const getTask = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'tasks'

  const sql = `SELECT * FROM ${table} WHERE id = ${id}`

  connection.query(sql, (err, result) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const banks = new StructResponse({
      code: 200,
      message: "consulta exitosa"
    }, {}, result)
    res.status(200).json(banks)
  })
}
const postCreateTask = (req, res) => {
  const data = req.body
  const table = 'tasks'

  const sql = `INSERT INTO ${table} SET ?`

  connection.query(sql, data, async (err, result) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const news = await queryByParamID(result.insertId, table)
    const response = new StructResponse({
      code: 200,
      message: `tarea creada con exito`
    }, {}, news)
    res.status(200).json(response)
  })
}
const putTask = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const data = req.body
  const table = 'tasks'

  const sql = `UPDATE ${table} SET ?, 
  updated_at = DEFAULT WHERE id = ${id}`

  connection.query(sql, data, async (err, _) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const typeMovement = await queryByParamID(id, table)
    const response = new StructResponse({
      code: 200,
      message: `tarea actualizada con exito`
    }, {}, typeMovement)
    res.status(200).json(response)
  })
}
const deleteTask = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'tasks'

  const sql = `DELETE FROM ${table} WHERE id = ${id}`

  if (!id) {
    errorQuery(res, 400, null, 'el campo id esta indefinido o es un string')
    return
  }

  connection.query(sql, async (err, _) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const responseJson = new StructResponse({
      code: 200,
      message: `tarea eliminada con exito`
    })
    res.status(200).json(responseJson)
  })
}

module.exports = {
  getTasks,
  getTask,
  postCreateTask,
  putTask,
  deleteTask
}
