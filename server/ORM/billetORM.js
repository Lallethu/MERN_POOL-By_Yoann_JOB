const crypto = require('crypto');
const databaseHandle = require('../models/billetModel');
let billetCollection;
(async () => {
    billetCollection = await databaseHandle();
})();

const getNextId =  async () => {
    if (!(await billetCollection.countDocuments())) {
        return 1;
    }
    return (await billetCollection.countDocuments()) + 1;
};

module.exports = {
    create: async (document) => {
        if (await billetCollection.findOne({title: document.title})) {
            return false;
        }
       
        const id = await getNextId();
        const query = {
            id: id,
            userLogin: document.userLogin,
            title: document.title,
            textBody: document.textBody,
            description: document.description ?? "A simple billet.",
            isSuspended: false,
            comments: []
        };
        
        try {
            await billetCollection.insertOne(query);
            return query;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    },
    read: async (filter = null) => {
        if (filter) {
            const query = { userLogin: filter}
            return await billetCollection.find(query).toArray() ?? false;
        }
        return await billetCollection.find().toArray() ?? false;
    },
    update: async (titleBillet, document) => {
        const filter = { title: titleBillet };
        const options = { $upsert: true };
        const newValues = {
            $set: {
                id: document.id,
                title: document.title,
                textBody: document.textBody,
                description: document.description,
                comments: document.comments
            }
        };
        return await billetCollection.updateOne(filter, newValues, options) ?? false
    },
    updateComment: async (titleBillet, document) => {
        const filter = { title: titleBillet, id: parseInt(document.id) };
        const options = { $upsert: true };
        const newValues = {
            $push: {
                commentBoy: document.commentBoy,
                comment: document.comment
            }
        };
        return await billetCollection.updateOne({ id: parseInt(document.id) }, {$push: { comments : { commentBoy: document.commentBoy , comment: document.comment } }}, options) ?? false
    },
    suspend: async (id, document) => {
        const filter = { title: document.title, id: parseInt(id)};
        const options = { $upsert: true };
        const newValues = {
            $set: {
                isSuspended: document.isSuspended,
            }
        };
        return await billetCollection.updateOne(filter, newValues, options) ?? false
    },
    delete: async (value) => {
        const query = { id: value };
        return await billetCollection.deleteOne(query) ?? false;
    },
    deleteComment: async (obj) => {
        const query = { id: parseInt(obj.id) };
        const filter = { $pull: { comments: { commentBoy: obj.userLogin, comment: obj.comment } } }
        return await billetCollection.updateOne(query, filter, { $upsert: true }) ?? false;
    },
    findByTitle: async (document) => {
        const query = { title: document.title};
        return await billetCollection.findOne(query) ?? false;
    },
    findById: async (value) => {
        const query = { id: value};
        return await billetCollection.findOne(query) ?? false;
    },
    findByUserLogin: async (value) => {
        const query = { userLogin: value};
        return await billetCollection.findOne(query) ?? false;
    }
}