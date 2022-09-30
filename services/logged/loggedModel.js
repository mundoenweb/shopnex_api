const connection = require('../../config/connection')

const table = 'users'

const getEmailUser = (email) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${table} WHERE email = '${email}'`
    connection.query(sql, (err, result) => {
      if (err) {
        const msg = 'Ups al parecer tenemos problemas, intente más tarde'
        return reject({err, msg})
      }
      resolve(result)
    })
  })
}

module.exports = getEmailUser
