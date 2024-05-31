const { createConnection } = require("mysql2");
const app = require("./app");
const crearTablas = require("./config/crearTablasConfig")

const PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  crearTablas();
});
