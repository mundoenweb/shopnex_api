const express = require('express')
const { getProfits, getProfitById } = require('../controller/profits/profits')
const router = express.Router()

router.get('/profits', getProfits)
router.get('/profits/:id', getProfitById)

module.exports = router
