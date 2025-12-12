const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 8080

const fs = require('fs');
const path = require('path');

const url = 'mongodb://localhost:27017';
const applicants_db = 'applicants_db';
const salary_db = 'average_salary'
const collectionName = 'applicants';

let db;
let collection;


const itUddannelser = ["PB i Softwareudvikling", "PB i IT-arkitektur", "Økonomi og it", "Datamatiker", "Digital konceptudvikling", "IT-teknolog", "PB i IT-sikkerhed", "PB i Webudvikling"];

app.get('/app/applicants/it-applicants', async (req, res) => {
  const results = await collection.find(
    { INSTITUTIONSAKT_BETEGNELSE: { $in: itUddannelser } },
    { projection: { Køn: 1, INSTITUTIONSAKT_BETEGNELSE: 1, _id: 0 } }
  ).toArray();
  
  res.json(results);
});

async function connectToMongo() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected to MongoDB');
    
    db = client.db(applicants_db);
    collection = db.collection(collectionName);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

app.get('/app/salary', async (req, res) => {
  const results = await db.collection(salary_db).find({}).toArray();
  res.json(results);
});

app.get('/app/applicants', async (req, res) => {
  const results = await collection.find().toArray();
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