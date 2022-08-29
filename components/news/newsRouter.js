const express = require('express')
const { getAllNews, getNews, createNews, updateNews, deleteNews } = require('./newsController')
const router = express.Router()

router.post('/news', createNews)
router.get('/news', getAllNews)
router.get('/news/:id', getNews)
router.put('/news/:id', updateNews)
router.delete('/news/:id', deleteNews)

module.exports = router
