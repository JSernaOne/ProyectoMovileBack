const queries = require("../../../utils/queries.util");

// Obtener todos los registros que no se han sincronizado de la base de datos local y enviarlos a la base de datos remota

const syncFromLocal = async (sync) => {
  const { user } = sync;
  const userQueries = user.map((u) => {
    return {
      query: `
          INSERT INTO User (id, name, email, username, password, salt, phone, status, show_quote, last_login, sync_status, last_sync)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          email = VALUES(email),
          username = VALUES(username),
          password = VALUES(password),
          salt = VALUES(salt),
          phone = VALUES(phone),
          status = VALUES(status),
          show_quote = VALUES(show_quote),
          last_login = VALUES(last_login),
          sync_status = VALUES(sync_status),
          last_sync = VALUES(last_sync)
        `,
      params: [
        u.id,
        u.name,
        u.email,
        u.username,
        u.password,
        u.salt,
        u.phone,
        u.status,
        u.show_quote,
        NULL, // Ensure last_login is either a valid datetime or null
        1, // sync_status should be 1 to indicate synced
        new Date(), // Ensure last_sync is either a valid datetime or null
      ],
    };
  });

  try {
    // Ejecutar todas las consultas generadas
    for (const { query, params } of userQueries) {
      await queries({ query, params });
    }
    return { message: "Sincronización exitosa" };
  } catch (error) {
    console.error("Error en la sincronización:", error);
    throw new Error("Sincronización fallida");
  }
};

// Enviar cambios a la base de datos local
const syncToLocal = async () => {
  const user = await queries({
    query:
      "SELECT id, name, email, username, password, salt, phone, status, show_quote, last_login, sync_status, last_sync FROM User",
  });
  return { user };
};

module.exports = {
  syncFromLocal,
  syncToLocal,
};
