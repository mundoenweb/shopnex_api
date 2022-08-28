const connectDB = require('../../config/connectionDB')

const getEmailUser = (email) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM usuarios 
    WHERE email = '${email}'`
    connectDB.query(sql, (err, result) => {
      if (err) {
        const msg = 'Ups al parecer tenemos problemas, intente más tarde'
        return reject({err, msg})
      }
      resolve(result)
    })
  })
}

module.exports = getEmailUser
