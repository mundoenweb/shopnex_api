const getEmailUser = require('./loggedModel')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const valideteDataLogged = require('./utils/valideteDataLogged')
const { handlerResponse } = require('../../utils/handlerResponse')

const secretPassword = process.env.SECRET_PASSWORD_JWT

const loggedAll = (req, res, next) => {
  const { email, password } = req.body

  const errValidate = valideteDataLogged(email, password)
  if (errValidate) return next(createError(400, errValidate))

  getEmailUser(email)
    .then(user => {

      if (!user.length || !bcrypt.compareSync(password, user[0].password)) {
        return next(createError(401, 'usuario o calve invalida'))
      }

      for (const key in user[0]) {
        if (key === 'active' && !user[0].active) {
          return next(createError(401, 'Usuario inactivo o suspendido'))
        }
      }

      const config = { expiresIn: 86400 }
      delete user[0].password
      const data = { ...user[0],  password: 'lero_lero_cara_de_tetero'}

      jwt.sign(data, secretPassword, config, (err, token) => {
        if (err) {
          const msg = 'Ups hubo un error de nuestro lado, favor intenta más tarde'
          return next(createError(500, msg))
        }

        const data = { user: user[0], token }
        handlerResponse(res, data, 200)
      })
    })
    .catch(error => next(createError(500, error)))

}

module.exports = {
  loggedAll
}
