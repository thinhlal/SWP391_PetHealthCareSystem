require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const { initSocket } = require('./config/socket/socket');
const app = express();
const route = require('./routes');
const db = require('./config/db');
const port = process.env.PORT;

const server = http.createServer(app);
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

// Connect to DB
db.connect();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Initialize routes
route(app);

initSocket(server);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { app, server };