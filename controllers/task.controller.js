const {User, Task} = require('../models');
module.exports.createTask = async (req, res, next) => {
    try {
        const {body, userInstance} = req;
        // const result = await Task.create({...body, userId});
        const task = await userInstance.createTask(body);
        res.status(201).send(task);
    } catch (error) {
        next(error);
    }
}

module.exports.getOneTask = async (req, res, next) => {
    try {
        const {params: {taskId}} = req;
        const result = await Task.findByPk(taskId);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUserTask = async (req, res, next) => {
    try {
        const {userInstance, pagination} = req;
        
        const allTasks = await userInstance.getTasks({
           ...pagination
        });
        res.status(200).send(allTasks);
    } catch (error) {
        next(error);
    }
}

module.exports.updateTask = async (req, res, next) => {
    try {
        const {params: {taskId}, body} = req;
        const result = await Task.update(body, {
            where: {
                id: taskId
            },
            returning: true
        })
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.deleteTask = async (req, res, next) => {
    try {
        const {params: {taskId}} = req;
        const result = await Task.destroy({
          where: {
            id: taskId
          }  
        });
        res.status(200).send({result});
    } catch (error) {
        next(error);
    }
}

module.exports.countUserTasks = async (req, res, next) => {
    try {
        const {userInstance} = req;
        const count = await userInstance.countTasks();
        res.status(200).send({count});
    } catch (error) {
        next (error);
    }
}