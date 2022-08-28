const connection = require('../../config/connection')
const queryByParam = require('../../utils/querys/queryByParam')

const table = 'banks'

const modelCreateBank = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${table} SET ?, active=1`

    connection.query(sql, data, (err, result) => {
      if (err) {
        reject({ ...err, table: 'banco', data })
        return
      }
      const bank = queryByParam(result.insertId, table, 'id')
      resolve(bank)
    })
  })
}

const modelGetAllBanks = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table}`

    connection.query(sql, (err, result) => {
      if (err) return reject({ ...err, table })
      resolve(result)
    })
  })
}

const modelGetBank = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table} WHERE id = ?`

    connection.query(sql, id, (err, result) => {
      if (err) return reject({ ...err, table })
      resolve(result)
    })
  })
}

const modelUpdateBank = (id, data) => {
  return new Promise((resolve, reject) => {
    const sql = `
    UPDATE ${table} 
    SET ?, updated_at = now()
    WHERE id = ${id}`
  
    connection.query(sql, data, async (err, result) => {
      if (err) return reject({ ...err, table })
      const bank = await queryByParam(id, table, 'id')
      resolve(bank)
    })
  })
}

const modelDeleteBank = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${table} WHERE id = ${id}`
  
    connection.query(sql, async (err, _) => {
      if (err) return reject({ ...err, table: 'banco' })
      resolve()
    })
  })
}


module.exports = {
  modelCreateBank,
  modelGetAllBanks,
  modelGetBank,
  modelUpdateBank,
  modelDeleteBank
}
