const express = require('express')
const router = express.Router()
const { verifyToken } = require('../../services/logged/middleware/verifyToken')
const { getAllTasks, getTask, createTask, updateTask, deleteTask } = require('./tasksController')

router.post('/tasks', createTask)
router.get('/tasks', getAllTasks)
router.get('/tasks/:id', getTask)
router.put('/tasks/:id', updateTask)

router.delete('/tasks/:id', deleteTask)


module.exports = router
