const express = require('express');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
const billetORM = require('../ORM/billetORM');

router.post('/billets', urlEncodedParser, async (req, res) => {
    try {
        const data = await billetORM.create(req.body);
        console.log("\n\t\x1b[1m\x1b[92mMern Pool\x1b[0m");
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        console.log(`Reponse data: \x1b[1m`);
        console.log(data, `\x1b[0m`);
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        return res.status(200).send({ data: data, res:"ok"});
    } catch (error) {
        return res.status(400).send({ res: "Something went wrong during the request"});
    }
});

router.get('/billets/:user/:id', async (req, res) => {
    try {
        const data = await billetORM.findById(parseInt(req.params.id));
        console.log("\n\t\x1b[1m\x1b[92mMern Pool\x1b[0m");
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        console.log(`Reponse data: \x1b[1m`);
        console.log(data, `\x1b[0m`);
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        return res.status(200).send({ data: data, res:"ok"});
    } catch (error) {
        return res.status(400).send({ res: "The user or id requested may not exists, make sure that the body follow the right properties"});
    }
});

router.patch('/billets/:user/:id', urlEncodedParser, async (req, res) => {
    try {
        const data = await billetORM.suspend(parseInt(req.body.id), await req.body);
        console.log("\n\t\x1b[1m\x1b[92mMern Pool\x1b[0m");
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        console.log(`Reponse data: \x1b[1m`);
        console.log(data, `\x1b[0m`);
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        return res.status(200).send({ data: data, res:"ok"});
    } catch (error) {
        return res.status(400).send({ res: "The user or id requested may not exists, make sure that the body follow the right properties"});;
    }
});

router.patch('/billets/:user/:id/comment', urlEncodedParser, async (req, res) => {
    try {
        const data = await billetORM.deleteComment(await req.body);
        console.log("\n\t\x1b[1m\x1b[92mMern Pool\x1b[0m");
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        console.log(`Reponse data: \x1b[1m`);
        console.log(data, `\x1b[0m`);
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        return res.status(200).send({ data: data, res:"ok"});
    } catch (error) {
        return res.status(400).send({ res: "Something went wrong during the request"});
    }
});

router.patch('/billets/:user/:id/comment/add', urlEncodedParser, async (req, res) => {
    try {
        const data = await billetORM.updateComment(await req.body.title, await req.body);
        console.log("\n\t\x1b[1m\x1b[92mMern Pool\x1b[0m");
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        console.log(`Reponse data: \x1b[1m`);
        console.log(data, `\x1b[0m`);
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        return res.status(200).send({ data: data, res:"ok"});
    } catch (error) {
        return res.status(400).send({ res: "Something went wrong during the request"});
    }
});

router.delete('/billets/:user/:id', async (req, res) => {
    try {
        const data = await billetORM.delete(req.params.id);
        console.log("\n\t\x1b[1m\x1b[92mMern Pool\x1b[0m");
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        console.log(`Reponse data: \x1b[1m`);
        console.log(data, `\x1b[0m`);
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        return res.status(200).send({ data: data, res:"ok"});
    } catch (error) {
        return res.status(400).send({ res: "Something went wrong during the request"});
    }
});

router.get('/billets/:user', async (req, res) => {
    try {
        const data = await billetORM.read(req.params.user);
        console.log("\n\t\x1b[1m\x1b[92mMern Pool\x1b[0m");
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        console.log(`Reponse data: \x1b[1m`);
        console.log(data, `\x1b[0m`);
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        return res.status(200).send({ data: data, res:"ok"});
    } catch (error) {
        return res.status(400).send({ res: "Something went wrong during the request"});
    }
});

module.exports = router;
