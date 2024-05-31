const pool = require('../config/databaseConfig');

const queries = async ({query, params}) => {
        try {
            const [rows] = await pool.query(query, params);
            return rows;
        } catch (error) {
            console.log(error + ' DATABASE ERROR');
            throw new Error(error.message);
        }
}
module.exports = queries;