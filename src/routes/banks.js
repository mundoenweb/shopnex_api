const express = require('express')
const router = express.Router()
const { getBanks, getOnBank, postBankCreate, putBank, putActiveBank, deleteBank } = require('../controller/banks/banks')
const { verifyToken } = require('../middlewares/verifyToken')

router.get('/banks', verifyToken, getBanks)
router.get('/banks/:id', verifyToken, getOnBank)

router.post('/banks', verifyToken, postBankCreate)

router.put('/banks/:id', verifyToken, putBank)
router.put('/banks/active', verifyToken, putActiveBank)

router.delete('/banks/:id', verifyToken, deleteBank)

module.exports = router
