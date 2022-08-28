const express = require('express');
const router = express.Router()
const {
  usersGet, 
  usersUpdate, 
  usersUpdateCredentials,
  usersUpdateCertificate,
  usersUpdateActive,
  usersDelete,  
  userGET,
  usersGetForApproval,
  getUsersMyReferreds
} = require('../controller/users/users');
const { verifyToken } = require('../../middlewares/verifyToken');

router.get('/users', verifyToken, usersGet)
router.get('/users/approval', verifyToken, usersGetForApproval)
router.get('/users/:id', verifyToken, userGET)
router.get('/users/referreds/:code_referred', verifyToken, getUsersMyReferreds)
router.put('/users/:id', verifyToken, usersUpdate)
router.put('/users/credentials/:id', verifyToken, usersUpdateCredentials)
router.put('/users/certificate/:id', verifyToken, usersUpdateCertificate)
router.put('/users/active/:id', verifyToken, usersUpdateActive)
router.delete('/users/:id', verifyToken, usersDelete)

module.exports = router
