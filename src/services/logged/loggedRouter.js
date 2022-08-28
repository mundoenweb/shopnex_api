const express = require('express')
const router = express.Router()
const { loggedAll } = require('./loggedController')

router.post('/logged', loggedAll)

module.exports = router
