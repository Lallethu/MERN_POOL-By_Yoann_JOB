const express = require('express');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const crypto = require('crypto');
const router = express.Router();
const userORM = require('../ORM/userORM');

// const test = require('../../tests/user');

router.get('/users', async (req, res) => {
    const data = await userORM.read();
    res.status(200).send({path: req.path, method: req.method, data: data});
});

router.post('/users/register', urlEncodedParser, async (req, res) => {
    try {
        const data = await userORM.create(req.body);
        console.log("\n\t\x1b[1m\x1b[92mMern Pool\x1b[0m");
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        console.log(`Reponse data: \x1b[1m`);
        console.log(data, `\x1b[0m`);
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        return res.status(200).send({path: req.path, method: req.method, data: data});
    } catch (error) {
        return res.status(400).send({path: "/users/register", method: "POST", data: false, mssg: "Login or email already in useor passwords don't match!"});
    }
});

router.post('/users/login', urlEncodedParser, async (req, res) => {
    try {
        const data = await userORM.findByLogin(req.body);
        const cryptedPassword = crypto.createHash('sha1').update(req.body.password).digest('hex');
        const userPassword = data.password;
        if (cryptedPassword !== userPassword) {
            return res.status(400).send({path: req.path, method: req.method, mssg: "Login or password don't match"});
        }
        console.log("\n\t\x1b[1m\x1b[92mMern Pool\x1b[0m");
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        console.log(`Reponse data: \x1b[1m`);
        console.log(data, `\x1b[0m`);
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        return res.status(200).send({path: req.path, method: req.method, user: data, status: 'LOGGED'});
    } catch (error) {
        return console.log(error.message)
    }
    
});

router.get('/users/logout', urlEncodedParser, async (req, res) => {    
    res.status(200).send({path: req.path, method: req.method, status: 'guest'});
});

module.exports = router;
