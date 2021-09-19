var express = require("express");
var router = express.Router();
var taskService = require("../services/task.service");

router.get("/", async function (req, res, next) {
  try {
    let tasks = await taskService.getTasks(req.query);

    res.json({
      message: "Task fetched successfully",
      operation: "SUCCESS",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:taskId", async function (req, res, next) {
  try {
    await taskService.deleteTask(req.params.taskId);
    res.json({
      message: "Task successfully deleted",
      operation: "SUCCESS",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log("Add Task Api Request Payload", req.body);
    let newTaskAddedData = await taskService.addTask(req.body);

    res.json({
      message: "Task successfully added",
      operation: "SUCCESS",
      data: newTaskAddedData,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    console.log("Update Task Api Request Payload", req.body);
    await taskService.updateTask(req.body);
    res.json({
      message: "Task updated successfully",
      operation: "SUCCESS",
    });
    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
