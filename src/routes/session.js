const express = require('express')
const { postLogin } = require('../controller/sessions')
const router = express.Router()

router.post('/', postLogin)


module.exports = router
