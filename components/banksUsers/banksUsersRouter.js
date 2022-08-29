const express = require('express')
const {
  getAllBanksUsers,
  getBankUser,
  createBanksUsers,
  updateBankUser,
  deleteBankUser
} = require('./banksUsersController')
const router = express.Router()

router.post('/banks_users', createBanksUsers)
router.get('/banks_users/:id', getBankUser)
router.get('/banks_users/all/:idUser', getAllBanksUsers)
router.put('/banks_users/:id', updateBankUser)
router.delete('/banks_users/:id', deleteBankUser)

module.exports = router
