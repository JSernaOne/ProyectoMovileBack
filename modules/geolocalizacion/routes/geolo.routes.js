const router = require('express').Router(); 


const geoloController = require('../controllers/geolo.controller');

const authMiddleware = require('../../core/middlewares/auth.middleware');

router.use(authMiddleware);
router.post('/saveGeolo', geoloController.saveGeolocalizacion);
router.get('/getGeolo', geoloController.getGeolocalizacion);


module.exports = router;