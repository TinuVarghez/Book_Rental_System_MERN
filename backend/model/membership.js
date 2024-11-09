const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating Schema and from schema we will create model 
const PlanSchema = new Schema({
    plan_name: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: String, required: true},
    price: {type:Number, required: true},
    coins: {type:Number, required: true},
    users: [{
        userid:{type:mongoose.Types.ObjectId, ref:'User'},
        balance:{type:Number},
        validity_date:{type:Date}
    }]
})

module.exports = mongoose.model('Plan', PlanSchema);