const { verifyToken } = require("../../../utils/jwt.util");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token not found" });
    }
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
