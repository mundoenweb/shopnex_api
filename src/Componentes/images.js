const express = require('express')
const router = express.Router()
const path = require('path')

const urlFiles = path.join(__dirname, '../../')

router.get('/files/:img', function (req, res) {
    console.log(urlFiles + req.url)
    res.sendFile(urlFiles + req.url)
})

router.get('/files/news/:img', function (req, res) {
    res.sendFile(urlFiles + req.url)
})

router.get('/files/users/:img', function (req, res) {
    res.sendFile(urlFiles + req.url)
})


module.exports = router