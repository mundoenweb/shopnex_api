const express = require('express')
const { getNews, getOneNews, postCreateNews, putNews, deleteNews } = require('../controller/news/news')
const router = express.Router()

router.get('/news', getNews)
router.get('/news/:id', getOneNews)
router.post('/news', postCreateNews)
router.put('/news/:id', putNews)
router.delete('/news/:id', deleteNews)


module.exports = router
