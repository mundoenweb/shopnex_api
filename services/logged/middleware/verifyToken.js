const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const secretPassword = process.env.SECRET_PASSWORD_JWT

const verifyToken = (req, res, next) => {
  const authorization_header = req.headers['authorization']

  if (!authorization_header) {
    next(createError(401))
    return
  }

  const token = authorization_header.split(" ")[1]

  jwt.verify(token, secretPassword, (err, userData) => {
    if (err) return next(createError(401, err))
    req.userData = userData
    next()
  })
}

exports.verifyToken = verifyToken
