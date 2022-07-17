const express = require('express')
const { getTasks, getTask, postCreateTask, putTask, deleteTask } = require('../controller/tasks/tasks')
const router = express.Router()

router.get('/tasks', getTasks)
router.get('/tasks/:id', getTask)
router.post('/tasks', postCreateTask)
router.put('/tasks/:id', putTask)
router.delete('/tasks/:id', deleteTask)


module.exports = router
