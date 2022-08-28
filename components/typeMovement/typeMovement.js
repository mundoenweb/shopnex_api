const connection = require('../../db/connection')
const errorQuery = require('../../handlersQuerys/errorQuery')
const queryByParamID = require('../../handlersQuerys/queryByParamID')
const StructResponse = require('../../models/response')

const getTypeMovement = (req, res) => {
  const sql = 'SELECT * FROM type_transactions'

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
const getOneTypeMovement = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'type_transactions'

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
const postCreateTypeMovement = (req, res) => {
  const data = req.body
  const table = 'type_transactions'

  const sql = `INSERT INTO ${table} SET ?`

  connection.query(sql, data, async (err, result) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const news = await queryByParamID(result.insertId, table)
    const response = new StructResponse({
      code: 200,
      message: `tipo de transsacción creado con exito`
    }, {}, news)
    res.status(200).json(response)
  })
}
const putTypeMovement = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const data = req.body
  const table = 'type_transactions'

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
      message: `tipo de transsacción actualizado con exito`
    }, {}, typeMovement)
    res.status(200).json(response)
  })
}
const deleteTypeMovement = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'type_transactions'

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
      message: `tipo de movimiento eliminado correctamente`
    })
    res.status(200).json(responseJson)
  })
}

module.exports = {
  getTypeMovement,
  getOneTypeMovement,
  postCreateTypeMovement,
  putTypeMovement,
  deleteTypeMovement
}
