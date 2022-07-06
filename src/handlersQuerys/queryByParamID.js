const connection = require("../db/connection")


const queryByParamID = (id, table) => {
  return new Promise((resolve, _) => {
    const sql = `SELECT * FROM ${table} WHERE id = ${id}`
    connection.query(sql, (err, result) => {
      if (err) return resolve("registrado, pero ubo un error al retonar el registro")
      return resolve(result)
    })
  })
}

module.exports = queryByParamID
