const connection = require("../../config/connection")


const queryByParam = (param, table, nameParam) => {
  return new Promise((resolve, _) => {
    const sql = `SELECT * FROM ${table} WHERE ${nameParam} = '${param}'`
    connection.query(sql, (err, result) => {
      if (err) return resolve(err)
      return resolve(result)
    })
  })
}

module.exports = queryByParam
