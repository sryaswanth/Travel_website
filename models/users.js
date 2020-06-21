let mongoose = require('mongoose');

let Schema = mongoose.Schema;      // create a schema to store the data of all objects in the DB

let userschema = new Schema({
    
    email: String,
    password : String
    
});

let User =mongoose.model('User', userschema,'users');

module.exports = {User};
