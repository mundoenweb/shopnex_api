const express = require('express')
const { emailReserve, emailWorker } = require('./emailController')
const router = express.Router()

router.post('/email/reserve', emailReserve)
router.post('/email/worker', emailWorker)

module.exports = router
