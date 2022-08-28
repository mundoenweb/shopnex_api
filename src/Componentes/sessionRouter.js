const express = require('express')
const { postLogin } = require('../controller/sessions')
const { usersCreate } = require('../controller/users/users')
const router = express.Router()

router.post('/', postLogin)
router.post('/register', usersCreate)


module.exports = router
