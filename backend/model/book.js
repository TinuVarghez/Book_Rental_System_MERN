const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating Schema and from schema we will create model 
const BookSchema = new Schema({
    book_name: {type: String, required: true},
    author: {type:mongoose.Types.ObjectId, required:true, ref:'Author'},
    genre: {type:mongoose.Types.ObjectId, required:true, ref:'Genre'},
    rating: {type:Number},
    image: {type:String},
    file_name: {type: String}
})

module.exports = mongoose.model('Book', BookSchema);