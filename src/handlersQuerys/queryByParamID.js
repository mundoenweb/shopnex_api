const connection = require("../db/connection")


const queryByParamID = (id, table, nameParamShear = 'id') => {
  return new Promise((resolve, _) => {
    const sql = `SELECT * FROM ${table} WHERE ${nameParamShear} = ${id}`
    connection.query(sql, (err, result) => {
      if (err) return resolve("registrado, pero ubo un error al retonar el registro")
      return resolve(result)
    })
  })
}

module.exports = queryByParamID
