const getEmailUser = require('./loggedModel')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const valideteDataLogged = require('./utils/valideteDataLogged')
const { handlerResponse } = require('../../utils/handlerResponse')

const secretPassword = process.env.SECRET_PASSWORD_JWT

const loggedAll = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  const errValidate = await valideteDataLogged(email, password)
  if(errValidate) return next(createError(400, errValidate))
  
  getEmailUser(email)
  .then(user => {
    
    if (!user.length || !bcrypt.compareSync(password, user[0].password)) {
      return next(createError(401, 'usuario o calve invalida'))
    }
    
    const optionsJWT = { expiresIn: 84600 }
    delete user[0].password

    jwt.sign({ ...user[0] }, secretPassword, optionsJWT, (err, token) => {
      
        if (err) {
          const msg = 'Ups hubo un error de nuestro lado, favor intenta más tarde'
          return next(createError(500, msg))
        }

        const response = { user: user[0], token }
        handlerResponse(res, response, 200)
      })
    })

    .catch(error => {
      next(createError(500, error))
    })





}

module.exports = {
  loggedAll
}
