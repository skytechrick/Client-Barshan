const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/Bar');

const db = mongoose.connection;
db.on('error',(error) => {
    console.log('MongoDB connection error:');
});

db.once('open',() => {
    console.log('Connected to MongoDB database.');
});


let database = {
    _id:{type:String},
    Logs:{type:String},
    Name:{type:String},
    Email:{type:String},
    Mobile_Number:{type:String},
    Password:{type:String},
    Auth:{type:Object}, 
    Verified:{type:String},
    Ban:{type:String},
    Cart:{type:Object},   
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
const User_ID = mongoose.model("User", database1);
const P = mongoose.model("Products", database2);

module.exports = {
    User_Profile: User_ID,
    Products:P,

}