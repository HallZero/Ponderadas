const { sequelize, Task } = require('../config/database');

async function createTask(task){
    
    await sequelize.sync(); // Make sure the table is created

    const new_task = await Task.create({ description: task.description, done: false, user_id: task.id });
    
    return new_task;
}

async function readTask(task){
    const tasks = await Task.findAll({
        where: {
            user_id: task.user_id
        }
    });

    return tasks;
}

async function updateTask(task){
    const task_updated = await Task.update({ description: task.description, done: task.done }, {
        where: {
            id: task.id
        }
    });

    return task_updated;
}

async function deleteTask(task){
    const task_deleted = await Task.destroy({
        where: {
            id: task.id
        }
    });

    return task_deleted;
}

module.exports = { createTask, readTask, updateTask, deleteTask };