const express = require('express');
const router = express.Router()
const {
  usersGet, 
  // usersCreate,
  usersUpdate, 
  usersUpdateCredentials,
  usersUpdateCertificate,
  usersUpdateActive,
  usersDelete,  
  userGET,
  usersGetForApproval
} = require('../controller/users/users');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/users', usersGet)
router.get('/users/approval', usersGetForApproval)
router.get('/users/:id', userGET)
// router.post('/users', usersCreate)
router.put('/users/:id', usersUpdate)
router.put('/users/credentials/:id', usersUpdateCredentials)
router.put('/users/certificate/:id', usersUpdateCertificate)
router.put('/users/active/:id', usersUpdateActive)
router.delete('/users/:id', usersDelete)

module.exports = router
