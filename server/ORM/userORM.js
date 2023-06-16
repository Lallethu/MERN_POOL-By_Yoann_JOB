const crypto = require('crypto');
const databaseHandle = require('../models/userModel');
let userCollection;
(async () => {
    userCollection = await databaseHandle();
})();

const getNextId =  async () => {
    if (!(await userCollection.countDocuments())) {
        return 1;
    }
    return (await userCollection.countDocuments()) + 1;
};

module.exports = {
    create: async (document) => {
        if (!(document.passwordConfirm === document.password)
        || await userCollection.findOne({login: document.login})
        || await userCollection.findOne({email: document.email})) {
            console.log("qdqsdkqsdk");
            return false;
        }
       
        try {
            const id = await getNextId();
            const query = {
                id: id,
                login: document.login,
                email: document.email,
                password: crypto
                    .createHash('sha1')
                    .update(document.password)
                    .digest('hex'),
                admin: false,
            };
            return await userCollection.insertOne(query) ?? false;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    },
    read: async () => {
        return await userCollection.find().toArray() ?? false;
    },
    update: async (idUser, document) => {
        const filter = { id: idUser };
        const newValues = {
            $set: {
                id: document.id,
                login: document.login,
                email: document.email,
                password: crypto
                    .createHash('sha1')
                    .update(document.password)
                    .digest('hex'),
                admin: document.admin,
            }
        };
        await userCollection.updateOne(filter, newValues)
    },
    delete: async (idUser) => {
        const query = { id: idUser };
        await userCollection.deleteOne(query);
    },
    findByLogin: async (document) => {
        const query = { login: document.login};
        return await userCollection.findOne(query) ?? false;
    },
    findById: async (value) => {
        const query = { id: value};
        return await userCollection.findOne(query) ?? false;
    },
    findByEmail: async (value) => {
        const query = { email: value};
        return await userCollection.findOne(query) ?? false;
    }
}