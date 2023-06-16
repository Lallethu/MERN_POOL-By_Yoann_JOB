require('dotenv').config();

const cors = require("cors");
const express = require('express');

const app = express();
const userController = require('./controllers/userController');
const billetController = require('./controllers/billetController');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("\n\t\x1b[1m\x1b[92mMern Pool\x1b[0m");
    console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
    console.log(`Request path: \x1b[1m\x1b[92m${req.path}\x1b[0m`);
    console.log(`Request method: \x1b[1m\x1b[92m${req.method}\x1b[0m`);
    console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
    next();
});

app.use('/api', userController);
app.use('/api', billetController);

app.listen(process.env.PORT, () => {
    console.log("\n\t\x1b[1m\x1b[92mMern Pool\x1b[0m");
    console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
    console.log(`Listening on port: \x1b[1m\x1b[92m${process.env.PORT}\x1b[0m`);
    console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
});
