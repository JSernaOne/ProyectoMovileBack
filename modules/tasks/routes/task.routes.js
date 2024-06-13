const router = require('express').Router(); 

const taskController = require('../controllers/task.controller');

const authMiddleware = require('../../core/middlewares/auth.middleware');

router.use(authMiddleware);
router.post('/saveTasks', taskController.saveTask);
router.get('/getTask', taskController.getTasks);
router.get('/getTask/:id', taskController.getTaskById);
router.delete('/deleteTask/:id', taskController.deleteTask);


module.exports = router;