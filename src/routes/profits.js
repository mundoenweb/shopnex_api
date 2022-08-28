const express = require('express')
const { getProfits, getProfitById } = require('../controller/profits/profits')
const { verifyToken } = require('../middlewares/verifyToken')
const router = express.Router()

router.get('/profits', verifyToken, getProfits)
router.get('/profits/:id', verifyToken, getProfitById)

module.exports = router
