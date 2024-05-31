const { generateToken } = require("../../../utils/jwt.util");
const { getUserByEmail, comparePassword } = require('../services/user.service'); // Asegúrate de importar correctamente

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Email invalido" });
    } 

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password invalido" });
    }

    const userObject = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const token = generateToken(userObject); 
    res.status(200).json({ message: "User logged in successfully", user: userObject, token });
    return true;
  } catch (error) {
    res.status(500).json({ message: error.message + " error de login" });
  }
};

module.exports = { login };
