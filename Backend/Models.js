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
    Name:{type:String},
    Email:{type:String},
    Mobile_Number:{type:String},
    Password:{type:String},
    Auth:{type:Object}, 
    Verified:{type:String},
    Ban:{type:String},
    
}


const database1 = new mongoose.Schema(database);
const User_ID = mongoose.model("User", database1);

module.exports = {
    User_Profile: User_ID,
}