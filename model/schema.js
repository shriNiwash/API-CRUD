const mongoose = require('mongoose');

//Creating the schema

const bookSchema = mongoose.Schema({
    id : {
        type: Number
    },
    name : {
        type: String
    },
    sold : {
        type: Number
    }
});

//Creating the model of the database

const BookModel = mongoose.model('BookModel',bookSchema);

module.exports = BookModel;