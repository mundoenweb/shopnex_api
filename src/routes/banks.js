const express = require('express')
const router = express.Router()
const { getBanks, getOnBank, postBankCreate, putBank, putActiveBank, deleteBank } = require('../controller/banks/banks')

router.get('/banks', getBanks)
router.get('/banks/:id', getOnBank)

router.post('/banks', postBankCreate)

router.put('/banks/:id', putBank)
router.put('/banks/active', putActiveBank)

router.delete('/banks/:id', deleteBank)

module.exports = router
