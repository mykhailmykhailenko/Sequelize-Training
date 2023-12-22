const {Router} = require('express');
const TaskController = require('../controllers/task.controller');
const {getUserInstance} = require('../middlewares/getUserInstance');

const taskRouter = Router();

taskRouter.post('/:userId', getUserInstance, TaskController.createTask);
taskRouter.get('/:userId', getUserInstance, TaskController.getAllUserTask);
taskRouter.get('/count/:userId', getUserInstance, TaskController.countUserTasks);
taskRouter.get('/:taskId', TaskController.getOneTask);
taskRouter.put('/:taskId', TaskController.updateTask);
taskRouter.delete('/:taskId', TaskController.deleteTask);

module.exports = taskRouter;