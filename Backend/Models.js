// const mongoose = require("mongoose");
// mongoose.connect('mongodb://127.0.0.1:27017/Bar');

// const db = mongoose.connection;
// db.on('error',(error) => {
//     console.log('MongoDB connection error:');
// });

// db.once('open',() => {
//     console.log('Connected to MongoDB database.');
// });


// let order = {
//     _id:{type:String},
//     Name:{type:String},
//     PIN:{type:String},
//     Mobile_Number:{type:String},
//     Address:{type:String},
//     Products:{type:Object},
//     Type:{type:String},
//     Confirmed:{type:String},
//     Date:{type:String},
//     Status:{type:String},
//     Pricing:{type:String},
// }

// let database = {
//     _id:{type:String},
//     Logs:{type:String},
//     Name:{type:String},
//     Email:{type:String},
//     Mobile_Number:{type:String},
//     Password:{type:String},
//     Orders:{type:Object},
//     Auth:{type:Object}, 
//     Verified:{type:String},
//     Cart:{type:Object},
//     Ban:{type:String},
//     Address:{type:Object},
//     PIN:{type:String},
// }
// let d = {
    
//     _id:{type:String},
//     URL:{type:String},
//     Category:{type:String},
//     Title:{type:String},
//     MRP:{type:String},
//     Selling_Price:{type:String},
//     Option:{type:Object},
//     Description:{type:String},
//     Images:{type:Object},
//     Orders_IDs:{type:Object},
//     Instock:{type:String},
// }

// const database1 = new mongoose.Schema(database);
// const database2 = new mongoose.Schema(d);
// const database3 = new mongoose.Schema(order);
// const User_ID = mongoose.model("User", database1);
// const P = mongoose.model("Products", database2);
// const z = mongoose.model("Orders", database3);

// module.exports = {
//     User_Profile: User_ID,
//     Products:P,
//     Orders:z,

// }



























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

async function getUserProfileOne(a) {
  const db = client.db(dbName);
  const collection = db.collection(userCollection);
  return await collection.findOne(a);
}

async function getUserProfile() {
  const db = client.db(dbName);
  const collection = db.collection(userCollection);
  return await collection.find({}).toArray();
}

async function getProduct() {
  const db = client.db(dbName);
  const collection = db.collection(productCollection);
  return await collection.find({}).toArray();
}

async function getOrder() {
  const db = client.db(dbName);
  const collection = db.collection(orderCollection);
  return await collection.find({}).toArray();
}

async function updateUserProfile(userId, update) {
  const db = client.db(dbName);
  const collection = db.collection(userCollection);
  return await collection.updateOne(userId, update);
}

async function updateOrder(orderId, update) {
  const db = client.db(dbName);
  const collection = db.collection(orderCollection);
  return await collection.updateOne(orderId, update );
}

async function insertUser(user) {
  const db = client.db(dbName);
  const collection = db.collection(userCollection);
  return await collection.insertOne(user);
}

async function insertProduct(user) {
  const db = client.db(dbName);
  const collection = db.collection(productCollection);
  return await collection.insertOne(user);
}

async function insertOrder(user) {
  const db = client.db(dbName);
  const collection = db.collection(orderCollection);
  return await collection.insertOne(user);
}

async function getOrderOne(a) {
  const db = client.db(dbName);
  const collection = db.collection(orderCollection);
  return await collection.findOne(a);
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
