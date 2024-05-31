const db = require("./databaseConfig");

// crear tablas
const crearTablas = async () => {
  try {
    const connection = await db.getConnection();
    await connection.query(`	
              CREATE TABLE IF NOT EXISTS User (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  name VARCHAR(255),
                  email VARCHAR(255),
                  username VARCHAR(255),
                  password VARCHAR(255),
                  salt VARCHAR(255),
                  phone VARCHAR(255),
                  status TINYINT DEFAULT 1,
                  show_quote BOOLEAN DEFAULT TRUE,
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
                  estado TINYINT DEFAULT 0,
                  FOREIGN KEY (iduser) REFERENCES User(id),
                  FOREIGN KEY (idGeo) REFERENCES Geolocalizacion(id)
              )`);

    await connection.query(`
              CREATE TABLE IF NOT EXISTS MotivationalQuote (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  quote TEXT,
                  author VARCHAR(255),
                  sync_status TINYINT DEFAULT 0,
                  last_sync TIMESTAMP DEFAULT NULL
              )`);

    await connection.query(`
              CREATE TABLE IF NOT EXISTS Configuracion (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  user_id INT,
                  show_quote BOOLEAN DEFAULT TRUE,
                  foto_perfil TEXT,
                  theme VARCHAR(255) DEFAULT 'light',
                  sync_status TINYINT DEFAULT 0,
                  last_sync TIMESTAMP DEFAULT NULL,
                  FOREIGN KEY (user_id) REFERENCES User(id)
      
          )`);
    connection.release();
    console.log("Tablas creadas exitosamente.");
  } catch (error) {
    console.error("Error al crear las tablas:", error.message);
  }
};

module.exports = crearTablas;