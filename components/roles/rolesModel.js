const connection = require('../../config/connection')
const queryByParam = require('../../utils/querys/queryByParam')

const table = 'roles'

const modelCreateRole = ({ name }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${table} (name) VALUES ('${name}')`
    connection.query(sql, async (err, result) => {
      if (err) return reject(err)
      const rol = await queryByParam(result.insertId, table, 'id')
      resolve(rol)
    })
  })
}
const modelGetAllRoles = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table}`
    connection.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
const modelGetRole = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table} WHERE id = ${id}`
    connection.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
const modelUpdateRole = (id, data) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ${table} SET name = '${data.name}' WHERE id = ${id};`

    connection.query(sql, async (err) => {
      if (err) return reject({ ...err, table })
      const rol = await queryByParam(id, table, 'id')
      resolve(rol)
    })
  })
}

const modelDeleteRol = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${table} WHERE id = ${id}`
    connection.query(sql, async (err) => {
      if (err) return reject({ ...err, table: 'rol' })
      resolve()
    })
  })
}


module.exports = {
  modelCreateRole,
  modelGetAllRoles,
  modelGetRole,
  modelUpdateRole,
  modelDeleteRol
}
