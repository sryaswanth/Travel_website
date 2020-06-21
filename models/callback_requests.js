let mongoose = require('mongoose');

let Schema = mongoose.Schema;      // create a schema to store the data of all objects in the DB

let callbackschema = new Schema({
    
    phoneNumber: String,
    date: Date,
    id: String              // since we use uniquid package to genrated id's (this is of string type)

});

let Callbackclass =mongoose.model('Callbackclass', callbackschema,'callback_requests');

module.exports = {Callbackclass};

