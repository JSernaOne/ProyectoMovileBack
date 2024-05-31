const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/sync', require('./modules/sync/routes/sync.routes'));
app.use('/api/users', require('./modules/users/routes/user.routes'));

module.exports = app;
