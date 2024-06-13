const db = require("./databaseConfig");

// crear tablas
const crearTablas = async () => {
  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    await connection.query(`	
      CREATE TABLE IF NOT EXISTS User (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          email VARCHAR(255) UNIQUE,
          username VARCHAR(255) UNIQUE,
          password VARCHAR(255),
          salt VARCHAR(255),
          phone VARCHAR(255),
          status TINYINT DEFAULT 1,
          last_login TIMESTAMP DEFAULT NULL,
          sync_status TINYINT DEFAULT 0,
          last_sync TIMESTAMP DEFAULT NULL
      )`);

    await connection.query(`	
      CREATE TABLE IF NOT EXISTS Geolocalizacion (
          id INT AUTO_INCREMENT PRIMARY KEY,
          latitude DECIMAL(10, 8),
          longitude DECIMAL(11, 8),
          sync_status TINYINT DEFAULT 0,
          last_sync TIMESTAMP DEFAULT NULL
      )`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Tareas (
          id INT AUTO_INCREMENT PRIMARY KEY,
          lista TEXT,
          fecha DATE,
          hora TIME,
          priority VARCHAR(255),
          idGeo INT,
          iduser INT,
          sync_status TINYINT DEFAULT 0,
          last_sync TIMESTAMP DEFAULT NULL,
          estado TINYINT DEFAULT 1,
          FOREIGN KEY (iduser) REFERENCES User(id),
          FOREIGN KEY (idGeo) REFERENCES Geolocalizacion(id)
      )`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Configuracion (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          show_quote INT DEFAULT 1,
          theme VARCHAR(255) DEFAULT 'light',
          sync_status TINYINT DEFAULT 0,
          last_sync TIMESTAMP DEFAULT NULL,
          FOREIGN KEY (user_id) REFERENCES User(id)
      )`);

    await connection.commit();
    connection.release();
    console.log("Tablas creadas exitosamente.");
  } catch (error) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    console.error("Error al crear las tablas:", error.message);
  }
};

module.exports = crearTablas;
