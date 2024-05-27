// database.js
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://navpreet6133:f4HsrQq75JlvPVRV@cluster0.th18mna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your actual MongoDB connection string
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

const connectToDatabase = async () => {
  if (!db) {
    try {
      await client.connect();
      db = client.db("help_a_mate"); // Replace with your actual database name
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
  return db;
};

const getCollection = async (collectionName) => {
  const database = await connectToDatabase();
  return database.collection(collectionName);
};

const getUsersCollection = () => getCollection("users");
const getPostsCollection = () => getCollection("posts");

module.exports = {
  connectToDatabase,
  getUsersCollection,
  getPostsCollection,
};
