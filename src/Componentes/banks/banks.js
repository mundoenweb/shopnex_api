const connection = require('../../db/connection')
const errorQuery = require('../../handlersQuerys/errorQuery')
const queryByParamID = require('../../handlersQuerys/queryByParamID')
const StructResponse = require('../../models/response')

const getBanks = (req, res) => {
  const sql = 'SELECT * FROM banks'

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
const getOnBank = (req, res) => { 
  const id = parseInt(req.params.id, 10)
  const sql = 'SELECT * FROM banks WHERE id = ?'

  connection.query(sql, id, (err, result) => {
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
const postBankCreate = (req, res) => {
  const data = req.body
  const table = 'banks'
  const sql = `INSERT INTO ${table} SET ?, active=1`

  connection.query(sql, data, async (err, result) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const bank = await queryByParamID(result.insertId, table)
    const banks = new StructResponse({
      code: 200,
      message: `banco ${data.name} creado con exito`
    }, {}, bank)
    res.status(200).json(banks)
  })
}
const putBank = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const data = req.body
  const table = 'banks'
  const sql = `UPDATE ${table} SET ? WHERE id = ${id}`

  connection.query(sql, data, async (err, result) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const bank = await queryByParamID(id, table)
    const banks = new StructResponse({
      code: 200,
      message: `banco ${bank[0].name} actualizado con exito`
    }, {}, bank)
    res.status(200).json(banks)
  })
}
const putActiveBank = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const data = req.body
  const table = 'banks'
  const sql = `UPDATE ${table} SET ? WHERE id = ${id}`

  connection.query(sql, data, async (err, result) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const bank = await queryByParamID(id, table)
    const banks = new StructResponse({
      code: 200,
      message: `banco ${bank[0].name} activado/desactivado con exito`
    }, {}, bank)
    res.status(200).json(banks)
  })

}
const deleteBank = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const table = 'banks'

  const sql = `DELETE FROM ${table} WHERE id = ${id}`

  if (!id) {
    errorQuery(res, 400, null, 'el campo id esta indefinido o es un string')
    return
  }

  connection.query(sql, async (err, _) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    const responseJson = new StructResponse({
      code: 200,
      message: `banco eliminado correctamente`
    })
    res.status(200).json(responseJson)
  })
}

module.exports = {
  getBanks,
  getOnBank,
  postBankCreate,
  putBank,
  putActiveBank,
  deleteBank
}
