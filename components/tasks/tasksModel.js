const connection = require('../../config/connection')

const table = 'tasks'

const modelCreateTask = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${table} SET ?, active=1`
    connection.query(sql, data, async (err, result) => {
      if (err) return reject(err)
      const task = await modelGetTask(result.insertId)
      resolve(task)
    })
  })
}
const modelGetAllTasks = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table}`
    connection.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
const modelGetTask = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table} WHERE id = ${id}`
    connection.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}
const modelUpdateTask = (id, data) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ${table} SET ?, updated_at = DEFAULT WHERE id = ${id}`

    connection.query(sql, data, async (err) => {
      if (err) return reject({ ...err, table })
      const task = await modelGetTask(id)
      resolve(task)
    })
  })
}
const modelDeleteTask = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${table} WHERE id = ${id}`
    connection.query(sql, async (err) => {
      if (err) return reject({ ...err, table: 'tareas' })
      resolve()
    })
  })
}


module.exports = {
  modelCreateTask,
  modelGetAllTasks,
  modelGetTask,
  modelUpdateTask,
  modelDeleteTask
}
