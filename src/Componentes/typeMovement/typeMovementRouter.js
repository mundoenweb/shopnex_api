const express = require('express')
const { getTypeMovement, getOneTypeMovement, postCreateTypeMovement, putTypeMovement, deleteTypeMovement } = require('../controller/typeMovement/typeMovement')
const { verifyToken } = require('../../middlewares/verifyToken')
const router = express.Router()

router.get('/type_movement', verifyToken, getTypeMovement)
router.get('/type_movement/:id', verifyToken, getOneTypeMovement)
router.post('/type_movement', verifyToken, postCreateTypeMovement)
router.put('/type_movement/:id', verifyToken, putTypeMovement)
router.delete('/type_movement/:id', verifyToken, deleteTypeMovement)

module.exports = router
