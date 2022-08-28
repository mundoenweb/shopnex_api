const express = require('express')
const { 
  createMovementWithdraw,
  createMovementBuy,
  createMovementTask,
  getMovementsAll,
  getMovementsById,
  getMovementsByIdUser,
  getMovementsTaks,
  getMovementsByTaskByIdUser
} = require('../controller/movements/movements')
const { verifyToken } = require('../middlewares/verifyToken')
const router = express.Router()

router.post('/movements/withdraw', verifyToken, createMovementWithdraw)
router.post('/movements/buy', verifyToken, createMovementBuy)
router.post('/movements/task', verifyToken, createMovementTask)

router.get('/movements', verifyToken, getMovementsAll)
router.get('/movements/tasks', verifyToken, getMovementsTaks)
router.get('/movements/:id', verifyToken, getMovementsById)
router.get('/movements/user/:id', verifyToken, getMovementsByIdUser)
router.get('/movements/user/tasks/:id', verifyToken, getMovementsByTaskByIdUser)

module.exports = router
