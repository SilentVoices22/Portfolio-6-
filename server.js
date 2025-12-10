const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 8080

const fs = require('fs');
const path = require('path');

const url = 'mongodb://localhost:27017';
const dbName = 'applicants_db';
const collectionName = 'applicants';

let db;
let collection;

async function connectToMongo() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected to MongoDB');
    
    db = client.db(dbName);
    collection = db.collection(collectionName);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

app.get('/app/applicants', async (req, res) => {
  const { INSTITUTIONSAKT_BETEGNELSE, Køn } = req.query;
  
  const filter = {};
  if (INSTITUTIONSAKT_BETEGNELSE) filter.INSTITUTIONSAKT_BETEGNELSE = INSTITUTIONSAKT_BETEGNELSE;
  if (Køn) filter.Køn = Køn;
  
  const results = await collection.find(filter).toArray();
  res.json(results);
});

app.get('/app/applicants/gender_work', async (req, res) => {
  const results = await collection.find({}, { 
    projection: { Køn: 1, INSTITUTIONSAKT_BETEGNELSE: 1, _id: 0 }
  }).toArray();
  
  res.json(results);
});

connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});