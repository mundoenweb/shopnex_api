const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const connection = require('../db/connection')
const errorQuery = require('../handlersQuerys/errorQuery')
const StructResponse = require('../models/response')
const secretPassword = "Adoracionviva.3467"

const postLogin = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const sql = `SELECT * FROM users WHERE email = '${email}'`

  connection.query(sql, (err, result) => {
    if (err) {
      errorQuery(res, 400, err)
      return
    }
    if (!result.length || 
      !bcrypt.compareSync(password, result[0].password)) {
      errorQuery(res, 401, err, "usuario o clave invalida")
      return
    }

    const user = result[0]
    delete user.password

    const optionsJWT = { expiresIn: 84600 }
    jwt.sign({ user }, secretPassword, optionsJWT, (_, token) => {

      const responseJson = new StructResponse({
        code: 201,
        message: `Bienvenido ${user.email}`
      }, {}, [{ token, user }])
      res.status(201).json(responseJson)
    })

  })

}

module.exports = {
  postLogin
}
