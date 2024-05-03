
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const {mongoose} = require('mongoose')
const uri = process.env.MONGO_URL;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let dbClient;

const client = new MongoClient(uri);

async function connect() {
  if (dbClient) return dbClient;
  try {
    await mongoose.connect(uri).then(() => {
        console.log('mongoose connected')
    });
    dbClient = client;
    console.log("Successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

async function getDb() {
  if (!dbClient) await connect();
  return dbClient.db(); // default db or specify a db
}

module.exports = { connect, getDb };
