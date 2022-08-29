const connection = require('../../config/connection')
const queryByParam = require('../../utils/querys/queryByParam')

const table = 'banks_users'

const modelCreateBankUser = (data) => {
  console.log("result")
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${table} SET ?`

    connection.query(sql, data, async (err, result) => {
      if (err) {
        reject({ ...err, table, data })
        return
      }
      const bank = await queryByParam(result.insertId, table, 'id')
      resolve(bank)
    })
  })
}
const modelGetAllBanksUsers = (id) => {
  return new Promise((resolve, reject) => {
    const banks_users = 'banks_users'
    const banks = 'banks'

    const sql = `SELECT
    ${banks_users}.id, users_id, banks_id, number_count,
    number_count_cci, name
    FROM ${banks_users} INNER JOIN ${banks}
    ON ${banks_users}.banks_id = banks.id
    WHERE users_id = ${id}`

    connection.query(sql, (err, result) => {
      if (err) return reject({ ...err, table })
      resolve(result)
    })
  })
}
const modelGetBankUser = (id) => {
  return new Promise((resolve, reject) => {
    const banks_users = 'banks_users'
    const banks = 'banks'

    const sql = `SELECT
    ${banks_users}.id, users_id, banks_id, number_count,
    number_count_cci, name
    FROM ${banks_users} INNER JOIN ${banks}
    ON ${banks_users}.banks_id = banks.id
    WHERE ${banks_users}.id = ${id}`

    connection.query(sql, (err, result) => {
      if (err) return reject({ ...err, table })
      resolve(result)
    })
  })
}

const modelUpdateBankUser = (id, data) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ${table} SET ?, 
    updated_at = DEFAULT WHERE id = ${id}`

    connection.query(sql, data, async (err, _) => {
      if (err) return reject({ ...err, table })
      const bank = await queryByParam(id, table, 'id')
      resolve(bank)
    })
  })
}

const modelDeleteBankUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${table} WHERE id = ${id}`

    connection.query(sql, async (err, _) => {
      if (err) return reject({ ...err, table: 'banco' })
      resolve()
    })
  })
}


module.exports = {
  modelCreateBankUser,
  modelGetAllBanksUsers,
  modelGetBankUser,
  modelUpdateBankUser,
  modelDeleteBankUser
}
