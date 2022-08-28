const express = require('express')
const { getTasks, getTask, postCreateTask, putTask, deleteTask } = require('../controller/tasks/tasks')
const { verifyToken } = require('../middlewares/verifyToken')
const router = express.Router()

router.get('/tasks', verifyToken, getTasks)
router.get('/tasks/:id', verifyToken, getTask)
router.post('/tasks', verifyToken, postCreateTask)
router.put('/tasks/:id', verifyToken, putTask)
router.delete('/tasks/:id', verifyToken, deleteTask)


module.exports = router
