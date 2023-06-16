const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DB_STRING);

const connectToBilletCollection =  async () => {
    try {
        await client.connect();
        const collec = client.db('mern-pool-day04').collection('billets');
        console.log("\n\t\x1b[1m\x1b[92mMern Pool\x1b[0m");
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        console.log("\x1b[1mDatabase STATUS:\x1b[0m");
        console.log(`\x1b[0m\x1b[1mHooked on \x1b[92m${collec.collectionName}.\x1b[0m`);
        console.log("\x1b[1m\x1b[92mConnection successful.\x1b[0m");
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        return collec;
    } catch (error) {
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        console.log("\x1b[1mDatabase STATUS:\x1b[0m");
        console.log(" \x1b[1m\x1b[31mConnection failed.\x1b[0m");
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
        console.log("\x1b[1m\x1b[31mError Block:\x1b[0m");
        console.log(error.message);
        console.log("\x1b[34m~~~~~~~~~~~~~~~~~~~~~~~~\x1b[0m");
    }
};

module.exports = connectToBilletCollection;