const express = require('express');
const router = express.Router()
const {
  subscriptionsGet, 
  subscriptionsCreate,
  subscriptionsUpdate, 
  subscriptionsDelete  
} = require('../controller/subscriptions/subscriptions')

router.get('/subscriptions', subscriptionsGet)
router.post('/subscriptions', subscriptionsCreate)
router.put('/subscriptions/:id', subscriptionsUpdate)
router.delete('/subscriptions/:id', subscriptionsDelete)

module.exports = router
