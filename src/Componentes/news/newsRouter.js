const express = require('express')
const { getNews, getOneNews, postCreateNews, putNews, deleteNews } = require('../controller/news/news')
const { verifyToken } = require('../../middlewares/verifyToken')
const router = express.Router()

router.get('/news', verifyToken, getNews)
router.get('/news/:id', verifyToken, getOneNews)
router.post('/news', verifyToken, postCreateNews)
router.put('/news/:id', verifyToken, putNews)
router.delete('/news/:id', verifyToken, deleteNews)


module.exports = router
