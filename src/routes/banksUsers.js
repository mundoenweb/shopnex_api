const express = require('express')
const {
  getBanksUsers,
  getallBanksUsers,
  getOnBanksUsers,
  postCreateBanksUsers,
  putBanksUsers,
  deleteBanksUsers
} = require('../controller/banksUsers/banksUsers')
const router = express.Router()

router.get('/banks_users', getBanksUsers)
router.get('/banks_users/all/:id', getallBanksUsers) //id del usuario
router.get('/banks_users/:id', getOnBanksUsers) //id del banco

router.post('/banks_users', postCreateBanksUsers)

router.put('/banks_users/:id', putBanksUsers)
router.delete('/banks_users/:id', deleteBanksUsers)

module.exports = router
