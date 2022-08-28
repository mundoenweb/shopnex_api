const express = require('express')
const router = express.Router()
const {
  rolesGet,
  rolesCreate,
  rolesUpdate,
  rolesDelete
} = require('../controller/roles/roles')
const { verifyToken } = require('../../middlewares/verifyToken')


router.get('/roles', verifyToken, rolesGet)
router.post('/roles', verifyToken, rolesCreate)
router.put('/roles/:id', verifyToken, rolesUpdate)
router.delete('/roles/:id', verifyToken, rolesDelete)

module.exports = router
