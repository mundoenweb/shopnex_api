const express = require('express')
const router = express.Router()
const {
  getAllBanks, getBank, createBank, updateBank, deleteBank
} = require('./banksController')

router.post('/banks', createBank)
router.get('/banks', getAllBanks)
router.get('/banks/:id', getBank)
router.put('/banks/:id', updateBank)

router.delete('/banks/:id', deleteBank)

module.exports = router
