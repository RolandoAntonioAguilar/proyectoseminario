const { Router } = require("express");
const router = Router();

const tools = require("../middlewares/tools");
const taskController = require("../controllers/tarea");

router.get("/tasks", [tools.verifyToken, taskController.listTasks]);
router.get("/task/:id", [tools.verifyToken, taskController.listTask]);
router.post("/create", [tools.verifyToken, taskController.createTask]);
router.put("/update/:id", [tools.verifyToken, taskController.updateTask]);
router.patch("/state/:id", [tools.verifyToken, taskController.updateTaskState]);

module.exports = router;
