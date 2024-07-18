const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = "mongodb+srv://abhijitroykarmakar1000:4qrtVmnozTCn9Z4s@zipbuydb.1ex9euh.mongodb.net/?retryWrites=true&w=majority&appName=ZIPBUYDB";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tlsAllowInvalidCertificates: true,  // Allow invalid certificates
  tlsAllowInvalidHostnames: true,     // Allow invalid hostnames
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

// Database and Collection Names
const dbName = 'ZIPBUYDB';
const userCollection = 'User';
const productCollection = 'Products';
const orderCollection = 'Orders';

async function getUserProfileOne(a, options = {}) {
  const db = client.db(dbName);
  const collection = db.collection(userCollection);
  return await collection.findOne(a, options);
}

async function getUserProfile(options = {}) {
  const db = client.db(dbName);
  const collection = db.collection(userCollection);
  return await collection.find({}, options).toArray();
}

async function getProduct(options = {}) {
  const db = client.db(dbName);
  const collection = db.collection(productCollection);
  return await collection.find({}, options).toArray();
}

async function getOrder(options = {}) {
  const db = client.db(dbName);
  const collection = db.collection(orderCollection);
  return await collection.find({}, options).toArray();
}

async function updateUserProfile(userId, update, options = {}) {
  const db = client.db(dbName);
  const collection = db.collection(userCollection);
  return await collection.updateOne(userId, update, options);
}

async function updateOrder(orderId, update, options = {}) {
  const db = client.db(dbName);
  const collection = db.collection(orderCollection);
  return await collection.updateOne(orderId, update, options);
}

async function insertUser(user, options = {}) {
  const db = client.db(dbName);
  const collection = db.collection(userCollection);
  return await collection.insertOne(user, options);
}

async function insertProduct(product, options = {}) {
  const db = client.db(dbName);
  const collection = db.collection(productCollection);
  return await collection.insertOne(product, options);
}

async function insertOrder(order, options = {}) {
  const db = client.db(dbName);
  const collection = db.collection(orderCollection);
  return await collection.insertOne(order, options);
}

async function getOrderOne(a, options = {}) {
  const db = client.db(dbName);
  const collection = db.collection(orderCollection);
  return await collection.findOne(a, options);
}

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUserProfileOne,
  insertUser,
  getProduct,
  insertProduct,
  getOrder,
  updateOrder,
  insertOrder,
  getOrderOne,
};

// Run the example usage if needed
// exampleUsage();
