const queries = require("../../../utils/queries.util");

// guardar tareas
const saveTask = async (task) => {
    const query = "INSERT INTO Tareas SET ?";
    return await queries({ query, params: task });
}

// obtener tareas
const getTasks = async () => {
    const query = "SELECT * FROM Tareas";
    return await queries({ query });
}

// obtener tarea por id
const getTaskById = async (id) => {
    const query = "SELECT * FROM Tareas WHERE id = ?";
    return await queries({ query, params: id });
}

// eliminar tarea por id
const deleteTask = async (id) => {
    // actuailzar el estado de la tarea
    const query = "UPDATE Tareas SET estado = 0 WHERE id = ?";
    return await queries({ query, params: id });
}

module.exports = {
    saveTask,
    getTasks,
    getTaskById,
    deleteTask
}