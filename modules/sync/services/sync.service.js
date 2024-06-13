const queries = require("../../../utils/queries.util");

// Sincronizar todos los registros que no se han sincronizado de la base de datos local a la base de datos remota
const syncFromLocal = async (sync) => {
  await syncFromLocalUser(sync);
  await syncFromLocalGeolo(sync);
  await syncFromLocalTareas(sync);
};

// Sincronizar usuarios desde la base de datos local
const syncFromLocalUser = async (sync) => {
  const { users } = sync;
  const userQueries = users.map((u) => ({
    query: `
      INSERT INTO User (id, name, email, username, password, salt, phone, status, last_login, sync_status, last_sync)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      email = VALUES(email),
      username = VALUES(username),
      password = VALUES(password),
      salt = VALUES(salt),
      phone = VALUES(phone),
      status = VALUES(status),
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
      u.last_login,
      1, // sync_status should be 1 to indicate synced
      new Date().toISOString().slice(0, 19).replace("T", " "),
    ],
  }));

  try {
    for (const { query, params } of userQueries) {
      await queries({ query, params });
    }
    return { message: "Sincronización exitosa" };
  } catch (error) {
    console.error("Error en la sincronización de usuarios:", error);
    throw new Error("Sincronización de usuarios fallida");
  }
};

// Sincronizar geolocalización desde la base de datos local
const syncFromLocalGeolo = async (sync) => {
  const { geolocalizacion } = sync;
  if (!geolocalizacion) {
    return { message: "No hay datos de geolocalización para sincronizar" };
  }
  const geoloQueries = geolocalizacion.map((g) => ({
    query: `
      INSERT INTO Geolocalizacion (id, latitude, longitude, sync_status, last_sync)
      VALUES (?, ?, ?, ?, ?) 
      ON DUPLICATE KEY UPDATE
      latitude = VALUES(latitude),
      longitude = VALUES(longitude),
      sync_status = VALUES(sync_status),
      last_sync = VALUES(last_sync)
    `,
    params: [
      g.id,
      g.latitude,
      g.longitude,
      1, // sync_status should be 1 to indicate synced
      new Date().toISOString().slice(0, 19).replace("T", " "),
    ],
  }));

  try {
    for (const { query, params } of geoloQueries) {
      await queries({ query, params });
    }
    return { message: "Sincronización exitosa" };
  } catch (error) {
    console.error("Error en la sincronización de geolocalización:", error);
    throw new Error("Sincronización de geolocalización fallida");
  }
};

// Sincronizar tareas desde la base de datos local
const syncFromLocalTareas = async (sync) => {
  const { tareas } = sync;
  if (!tareas) {
    return { message: "No hay datos de tareas para sincronizar" };
  }
  const tareasQueries = tareas.map((t) => ({
    query: `
      INSERT INTO Tareas (id, lista, fecha, hora, priority, idGeo, iduser, sync_status, last_sync, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
      ON DUPLICATE KEY UPDATE
      lista = VALUES(lista),
      fecha = VALUES(fecha),
      hora = VALUES(hora),
      priority = VALUES(priority),
      idGeo = VALUES(idGeo),
      iduser = VALUES(iduser),
      sync_status = VALUES(sync_status),
      last_sync = VALUES(last_sync),
      estado = VALUES(estado)
    `,
    params: [
      t.id,
      t.lista,
      formatDate(t.fecha),
      t.hora,
      t.priority,
      t.idGeo,
      t.iduser,
      1, // sync_status should be 1 to indicate synced
      new Date().toISOString().slice(0, 19).replace("T", " "),
      t.estado,
    ],
  }));

  try {
    for (const { query, params } of tareasQueries) {
      await queries({ query, params });
    }
    return { message: "Sincronización exitosa" };
  } catch (error) {
    console.error("Error en la sincronización de tareas:", error);
    throw new Error("Sincronización de tareas fallida");
  }
};

// Enviar cambios desde la base de datos remota a la base de datos local
const syncToLocal = async () => {
  const user = await syncToLocalUser();
  const geolocalizacion = await syncToLocalGeolo();
  const tareas = await syncToLocalTareas();
  return { user, geolocalizacion, tareas };
};

// Sincronizar usuarios a la base de datos local
const syncToLocalUser = async () => {
  return await queries({
    query:
      "SELECT id, name, email, username, password, salt, phone, status, last_login, sync_status, last_sync FROM User",
  });
};

// Sincronizar geolocalización a la base de datos local
const syncToLocalGeolo = async () => {
  return await queries({
    query:
      "SELECT id, latitude, longitude, sync_status, last_sync FROM Geolocalizacion",
  });
};

// Sincronizar tareas a la base de datos local
const syncToLocalTareas = async () => {
  return await queries({
    query:
      "SELECT id, lista, fecha, hora, priority, idGeo, iduser, sync_status, last_sync, estado FROM Tareas",
  });
};

// Formatear fecha a formato MySQL
const formatDate = (date) => {
  return date.slice(0, 19).replace("T", " ");
};

module.exports = {
  syncFromLocal,
  syncToLocal,
};
