const queries = require("../../../utils/queries.util");

const getUsers = async () => {
  const query = "SELECT * FROM User";
  return await queries({ query });
};

const createUser = async (user) => {
  const query = "INSERT INTO User SET ?";
  return await queries({ query, params: user });
};

const getUserById = async (id) => {
  const query = "SELECT * FROM User WHERE id = ?";
  return await queries({ query, params: id });
};

const updateUser = async (id, user) => {
  const query = "UPDATE User SET ? WHERE id = ?";
  return await queries({ query, params: [user, id] });
};

// Eliminar un usuario por id
const deleteUser = async (id) => {
  const query = "DELETE FROM User WHERE id = ?";
  return await queries({ query, params: id });
};

// Elminar todos los usuarios
const deleteAllUsers = async () => {
  const query = "DELETE FROM User";
  return await queries({ query });
};

const getUserByEmail = async (email) => {
  const query = "SELECT id, email, password, username FROM User WHERE email = ?";
  const result = await queries({ query, params: [email] });
  return result.length ? result[0] : null; // retornar el primer usuario encontrado o null
};

const comparePassword = async (password, storedPassword) => {
  return password === storedPassword;
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  deleteAllUsers,
  getUserByEmail,
  comparePassword,
};
