const router = require('express').Router(); 


const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

const authMiddleware = require('../../core/middlewares/auth.middleware');

router.post('/', userController.createUser);
router.post('/login', authController.login); // recibe la petición con req.body {email, password}


router.use(authMiddleware);
router.get('/', userController.getUsers);
router.get('/email', userController.getUserByEmail); // recibe la peticón con req.params.email 
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;