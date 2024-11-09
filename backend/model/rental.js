const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating Schema and from schema we will create model 
const RentalSchema = new Schema({
    book_id: {type:mongoose.Types.ObjectId, required:true, ref:'Book'},
    user_id: {type:mongoose.Types.ObjectId, required:true, ref:'User'},
    start_date: {type: Date, required:true}
})

module.exports = mongoose.model('Rental', RentalSchema);