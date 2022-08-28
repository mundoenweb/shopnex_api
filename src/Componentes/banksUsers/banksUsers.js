const connection = require('../../db/connection')
const errorQuery = require('../../handlersQuerys/errorQuery')
const queryByParamID = require('../../handlersQuerys/queryByParamID')
const StructResponse = require('../../models/response')

const getBanksUsers = (req, res) => {
  const sql = 'SELECT * FROM banks_users'

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
const getallBanksUsers = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const banks_users = 'banks_users'
  const banks = 'banks'

  const sql = `SELECT
  ${banks_users}.id, users_id, banks_id, number_count,
  number_count_cci, name
  FROM ${banks_users} INNER JOIN ${banks}
  ON ${banks_users}.banks_id = banks.id
  WHERE users_id = ${id}`

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
const getOnBanksUsers = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const banks_users = 'banks_users'
  const banks = 'banks'

  const sql = `SELECT
  ${banks_users}.id, users_id, banks_id, number_count,
  number_count_cci, name
  FROM ${banks_users} INNER JOIN ${banks}
  ON ${banks_users}.banks_id = banks.id
  WHERE ${banks_users}.id = ${id}`

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

// listo
const postCreateBanksUsers = (req, res) => {
  const data = req.body
  const table = 'banks_users'
  const sql = `INSERT INTO ${table} SET ?`

  connection.query(sql, data, async (err, result) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const bank = await queryByParamID(result.insertId, table)
    const banks = new StructResponse({
      code: 200,
      message: `cuenta bancaria creada con exito`
    }, {}, bank)
    res.status(200).json(banks)
  })
}
const putBanksUsers = (req, res) => {
  const id = parseInt(req.params.id, 10)
  const data = req.body
  const table = 'banks_users'
  const sql = `UPDATE ${table} SET ?, updated_at = DEFAULT WHERE id = ${id}`

  connection.query(sql, data, async (err, _) => {
    if (err) {
      errorQuery(res, 500, err)
      return
    }
    const bank = await queryByParamID(id, table)
    const banks = new StructResponse({
      code: 200,
      message: `banco actualizado con exito`
    }, {}, bank)
    res.status(200).json(banks)
  })
}
const deleteBanksUsers = (req, res) => {

  const id = parseInt(req.params.id, 10)
  const table = 'banks_users'

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
  getBanksUsers,
  getallBanksUsers,
  getOnBanksUsers,
  postCreateBanksUsers,
  putBanksUsers,
  deleteBanksUsers
}
