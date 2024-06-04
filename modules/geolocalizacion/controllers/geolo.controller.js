const geoloService = require('../services/geolo.service');

const saveGeolocalizacion = async (req, res) => {
    try {
        const geolo = req.body;
        const geolos = await geoloService.saveGeolocalizacion(geolo);
        res.status(200).json(geolos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getGeolocalizacion = async (req, res) => {
    try {
        const geolos = await geoloService.getGeolos();
        res.status(200).json(geolos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    saveGeolocalizacion,
    getGeolocalizacion
}