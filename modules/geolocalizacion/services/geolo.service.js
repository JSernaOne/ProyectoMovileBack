const queries = require("../../../utils/queries.util");

// guardar geolocalizacion
const saveGeolocalizacion = async (geolocalizacion) => {
    const query = "INSERT INTO Geolocalizacion SET ?";
    return await queries({ query, params: geolocalizacion });
}

// obtener geolocalizacion
const getGeolocalizacion = async () => {
    const query = "SELECT * FROM Geolocalizacion";
    return await queries({ query });
}

module.exports = {
    saveGeolocalizacion,
    getGeolocalizacion,
};