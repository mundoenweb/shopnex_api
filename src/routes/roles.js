const express = require('express')
const router = express.Router()
const {
  rolesGet,
  rolesCreate,
  rolesUpdate,
  rolesDelete
} = require('../controller/roles/roles')


router.get('/roles', rolesGet)
router.post('/roles', rolesCreate)
router.put('/roles/:id', rolesUpdate)
router.delete('/roles/:id', rolesDelete)

module.exports = router
