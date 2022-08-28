const express = require('express');
const router = express.Router()
const {
  subscriptionsGet, 
  subscriptionsCreate,
  subscriptionsUpdate, 
  subscriptionsDelete,  
  getSubscriptionById
} = require('../controller/subscriptions/subscriptions');
const { verifyToken } = require('../../middlewares/verifyToken');

router.get('/subscriptions', verifyToken, subscriptionsGet)
router.get('/subscriptions/:id', verifyToken, getSubscriptionById)
router.post('/subscriptions', verifyToken, subscriptionsCreate)
router.put('/subscriptions/:id', verifyToken, subscriptionsUpdate)
router.delete('/subscriptions/:id', verifyToken, subscriptionsDelete)

module.exports = router
