const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating Schema and from schema we will create model 
const UserSchema = new Schema({
    username: {type: String , required: true},
    password: {type: String , required: true},
    role: {type: String , required: true}
})

module.exports = mongoose.model('User', UserSchema);