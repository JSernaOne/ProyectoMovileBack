const router = require('express').Router(); 

const syncController = require('../../sync/controllers/sync.controller');

const authMiddleware = require('../../core/middlewares/auth.middleware');

// obtener cambios de la base de datos local
router.post('/syncFromLocal', syncController.syncFromLocal);
// enviar cambios a la base de datos local
router.get('/syncToLocal', syncController.syncToLocal);

// ruta para obtener todos los sincronizadores de la base de datos bidireccional
//router.use(authMiddleware);

module.exports = router;