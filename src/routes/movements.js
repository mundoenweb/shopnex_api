const express = require('express')
const { 
  createMovementWithdraw,
  createMovementBuy,
  createMovementTask,
  getMovementsAll,
  getMovementsById,
  getMovementsByIdUser
} = require('../controller/movements/movements')
const router = express.Router()

router.post('/movements/withdraw', createMovementWithdraw)
router.post('/movements/buy', createMovementBuy)
router.post('/movements/task', createMovementTask)

router.get('/movements', getMovementsAll)
router.get('/movements/:id', getMovementsById)
router.get('/movements/user/:id', getMovementsByIdUser)

module.exports = router
