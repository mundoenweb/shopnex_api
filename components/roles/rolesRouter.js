const express = require('express')
const router = express.Router()
const {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  deleteRol
} = require('./rolesController')

router.post('/roles', createRole)
router.get('/roles', getAllRoles)
router.get('/roles/:id', getRole)
router.put('/roles/:id', updateRole)
router.delete('/roles/:id', deleteRol)

module.exports = router
