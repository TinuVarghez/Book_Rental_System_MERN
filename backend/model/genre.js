const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating Schema and from schema we will create model 
const GenreSchema = new Schema({
    genre_name: {type: String , required: true},
    books: [{type:mongoose.Types.ObjectId, ref:'Book'}]
})

module.exports = mongoose.model('Genre', GenreSchema);