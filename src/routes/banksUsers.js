const express = require('express')
const {
  getBanksUsers,
  getallBanksUsers,
  getOnBanksUsers,
  postCreateBanksUsers,
  putBanksUsers,
  deleteBanksUsers
} = require('../controller/banksUsers/banksUsers')
const { verifyToken } = require('../middlewares/verifyToken')
const router = express.Router()

router.get('/banks_users', verifyToken, getBanksUsers)
router.get('/banks_users/all/:id', verifyToken, getallBanksUsers) //id del usuario
router.get('/banks_users/:id', verifyToken, getOnBanksUsers) //id del banco

router.post('/banks_users', verifyToken, postCreateBanksUsers)

router.put('/banks_users/:id', verifyToken, putBanksUsers)
router.delete('/banks_users/:id', verifyToken, deleteBanksUsers)

module.exports = router
