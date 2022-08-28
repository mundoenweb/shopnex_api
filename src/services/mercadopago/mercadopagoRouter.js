const express = require('express')
const { verifyToken } = require('../logged/middleware/verifyToken')
const pay = require('./mercadopagoController')
const router = express.Router()

router.use('/mercadopago', verifyToken, pay)

module.exports = router
