if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { MongoClient } = require('mongodb');

// mongodb instance
const client = new MongoClient(process.env.DATABASE_URI);

async function main() {
    
    // removes Deprecation Warnings
    new MongoClient(process.env.DATABASE_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    try {
        // Block further execution (await) until the client is connected
        await client.connect();

        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases() {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};