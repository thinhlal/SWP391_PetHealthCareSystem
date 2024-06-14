const express = require('express');
const cors = require('cors');
const app = express();
const route = require('./routes');
const db = require('./config/db');
const port = 5000;

//multiple start different domain
app.use(cors());

// Connect to DB
db.connect();

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

// Initialize routes
route(app);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
