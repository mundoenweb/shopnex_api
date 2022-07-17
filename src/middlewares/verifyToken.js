const StructResponse = require("../models/response")
const jwt = require('jsonwebtoken')
const errorQuery = require("../handlersQuerys/errorQuery")
const secretPassword = "Adoracionviva.3467"

const verifyToken = (req, res, next) => {
  const authorization_header = req.headers['authorization']

  if (!authorization_header) {
    errorQuery(res, 401)
    return
  }
  const token = authorization_header.split(" ")[1]

  jwt.verify(token, secretPassword, (err, userData) => {
    if (err) {
      errorQuery(res, 401, err, "token invalido")
      return
    }
    req.userData = userData.user
    next()
  })
}

exports.verifyToken = verifyToken
