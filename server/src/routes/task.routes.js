const { Router } = require('express');


const {postFile, getAllTasks, getTask, postTask, deleteTask, updateTask} = require('../controlles/task.controllers')

const router = Router()

router.post("/insert-datos", postFile)

router.get("/tasks", getAllTasks)

router.get("/tasks/:id", getTask)

router.post("/tasks", postTask)

router.delete("/tasks/:id", deleteTask)

router.put("/tasks/:id", updateTask )
module.exports = router;