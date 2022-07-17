const express = require('express')
const { getTypeMovement, getOneTypeMovement, postCreateTypeMovement, putTypeMovement, deleteTypeMovement } = require('../controller/typeMovement/typeMovement')
const router = express.Router()

router.get('/type_movement', getTypeMovement)
router.get('/type_movement/:id', getOneTypeMovement)
router.post('/type_movement', postCreateTypeMovement)
router.put('/type_movement/:id', putTypeMovement)
router.delete('/type_movement/:id', deleteTypeMovement)

module.exports = router
