const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    customer_name:{
        type:String,
        required:true,
        index: { unique: true }
    },
    major_change_plan:{
        type:String,
        required:true
    },
    incident_status:{
        type:String
    },
    issue_type:{
        type:String
    },
    status:{
        type:String
    },
    p_zero:{
        type:Number,
        default: 0
    },
    p_one:{
        type:Number,
        default: 0
    },
    p_two:{
        type:Number,
        default: 0
    }

},{timestamps: true})

module.exports = mongoose.model('Customer',customerSchema)