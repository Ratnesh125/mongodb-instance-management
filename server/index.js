const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;
 
app.use(cors());
app.use(express.json());

app.post('/instance', async (req, res) => {
    const uri = req.body.uri || ""
    console.log(uri);

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const admin = client.db().admin();
        const dbInfo = await admin.listDatabases();
        const result = {
            databases: []
        };

        for (const db of dbInfo.databases) {
            const dbName = db.name;
            const dbEmpty = db.empty;
            const dbSizeOnDisk = db.sizeOnDisk
            const databaseObj = { name: dbName, sizeOnDisk: dbSizeOnDisk, empty: dbEmpty, collections: [] };

            const database = client.db(dbName);

            const collectionsCursor = database.listCollections();
            await collectionsCursor.forEach((collection) => {
                databaseObj.collections.push(collection.name);
            });

            result.databases.push(databaseObj);
        }
        res.json(result);
    } catch (error) {
        res.json({
            databases: []
        });
      } finally {
        await client.close();
    }
});

app.get('/instance/:database', async (req, res) => {
    const databaseName = req.params.database;
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(databaseName);
    const collectionsCursor = db.listCollections();
    const collections = [];
    await collectionsCursor.forEach((collection) => {
        collections.push(collection.name);
    });
    res.json({ collections });
});


//  create a new db
app.post('/create-database', async (req, res) => {
    const { databaseName, collectionName } = req.body;
    const uri = req.body.uri || ""
    const client = new MongoClient(uri);

    if (!databaseName || !collectionName) {
        return res.status(400).json({ message: 'Database name and collection name are required' });
    }

    try {
        await client.connect();

        const database = client.db(databaseName);
        await database.createCollection(collectionName);

        res.status(201).json({ message: `Database '${databaseName}' with collection '${collectionName}' created successfully` });
    } catch (error) {
        console.error('Error creating database and collection:', error);
        res.status(500).json({ message: 'Error creating database and collection' });
    } finally {
        await client.close();
    }
});

app.post('/add-entry', async (req, res) => {
    const { databaseName, collectionName, entry } = req.body;
    const uri = req.body.uri || ""
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(databaseName);
        const result = await db.collection(collectionName).insertOne(entry);

        res.status(201).json({ message: 'Entry added successfully', result });
    } catch (error) {
        console.error('Error adding entry:', error);
        res.status(500).json({ error: 'Error adding entry' });
    } finally {
        await client.close();
    }
});

app.delete('/delete-database', async (req, res) => {
    const databaseName = req.body.databaseName;
    const uri = req.body.uri || ""
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await client.db(databaseName).dropDatabase();

        res.status(200).json({ message: 'Database removed successfully' });
    } catch (error) {
        console.error('Error removing database:', error);
        res.status(500).json({ error: 'Error removing database' });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
