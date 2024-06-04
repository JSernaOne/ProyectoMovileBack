const taskService = require('../services/task.service');

const saveTask = async (req, res) => {
    try {
        const task = req.body;
        const tasks = await taskService.saveTask(task);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await taskService.getTaskById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await taskService.deleteTask(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    saveTask,
    getTasks,
    getTaskById,
    deleteTask
}