const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/Bar');

const db = mongoose.connection;
db.on('error',(error) => {
    console.log('MongoDB connection error:');
});

db.once('open',() => {
    console.log('Connected to MongoDB database.');
});


let order = {
    _id:{type:String},
    Name:{type:String},
    PIN:{type:String},
    Mobile_Number:{type:String},
    Address:{type:String},
    Products:{type:Object},
    Type:{type:String},
    Confirmed:{type:String},
    Date:{type:String},
    Status:{type:String},
    Pricing:{type:String},
}

let database = {
    _id:{type:String},
    Logs:{type:String},
    Name:{type:String},
    Email:{type:String},
    Mobile_Number:{type:String},
    Password:{type:String},
    Orders:{type:Object},
    Auth:{type:Object}, 
    Verified:{type:String},
    Cart:{type:Object},
    Ban:{type:String},
    Address:{type:Object},
    PIN:{type:String},
}
let d = {
    
    _id:{type:String},
    URL:{type:String},
    Category:{type:String},
    Title:{type:String},
    MRP:{type:String},
    Selling_Price:{type:String},
    Option:{type:Object},
    Description:{type:String},
    Images:{type:Object},
    Orders_IDs:{type:Object},
    Instock:{type:String},
}

const database1 = new mongoose.Schema(database);
const database2 = new mongoose.Schema(d);
const database3 = new mongoose.Schema(order);
const User_ID = mongoose.model("User", database1);
const P = mongoose.model("Products", database2);
const z = mongoose.model("Orders", database3);

module.exports = {
    User_Profile: User_ID,
    Products:P,
    Orders:z,

}