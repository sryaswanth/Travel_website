let mongoose = require('mongoose');

let Schema = mongoose.Schema;      // create a schema to store the data of all objects in the DB

let emailschema = new Schema({
    
    email: String,
    name : String,
    text: String,
    date: Date,
    id: String              // since we use uniquid package to genrated id's (this is of string type)

});

let Email =mongoose.model('Email', emailschema,'emails');

module.exports = {Email};

