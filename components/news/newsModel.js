const connection = require('../../config/connection')
const queryByParam = require('../../utils/querys/queryByParam')

const table = 'news'

const modelCreateNews = (data, image) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${table} SET ?, image = '${image}'`

    connection.query(sql, data, async (err, result) => {
      if (err) {
        reject({ ...err, table: 'Noticia', data })
        return
      }
      const news = await queryByParam(result.insertId, table, 'id')
      resolve(news)
    })
  })
}
const modelGetAllNews = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table} ORDER BY created_at DESC`
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}
const modelGetNews = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table} WHERE id = ${id}`
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

const modelUpdateNews = (id, data, imagePath) => {
  return new Promise((resolve, reject) => {

    let sql = `UPDATE ${table} SET`

    if (Object.entries(data).length) sql += ` ? , `
    if (imagePath !== '') sql += ` image = '${imagePath}', `
    sql += `updated_at = DEFAULT WHERE id = ${id}`

    connection.query(sql, data, async (err) => {
      if (err) return reject({ ...err, table })
      const news = await queryByParam(id, table, 'id')
      resolve(news)
    })
  })
}

const modelDeleteNews = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM ${table} WHERE id = ${id}`
    connection.query(sql, async (err) => {
      if (err) return reject({ ...err, table: 'noticia' })
      resolve()
    })
  })
}


module.exports = {
  modelCreateNews,
  modelGetAllNews,
  modelGetNews,
  modelUpdateNews,
  modelDeleteNews
}
