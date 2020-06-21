let mongoose = require('mongoose');

let Schema = mongoose.Schema;      // create a schema to store the data of all objects in the DB


let postschema = new Schema({
    title: String,
    date: Date,
    description: String,
    country: String,
    text: String,
    imageurl: String,
    id: String              // since we use uniquid package to genrated id's (this is of string type)

});

let Post = mongoose.model('Post', postschema); // created class'Post' with the schema type "postschema"

module.exports = {
    Post        // meaning both key and value name is 'Post', we can also write it like (Post = Post) i.e (keyname = valuename)
}


console.log(module);
