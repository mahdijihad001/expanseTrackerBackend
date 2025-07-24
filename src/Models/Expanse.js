const mongoose = require("mongoose");


const expanseSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId , ref : "user" , required : true},
    type : {type : String , default : "expanse"},
    icon : {type : String},
    category : {type : String , required : true},
    amount : {type : Number , required : true},
    date : {type : Date , default : Date.now}
},{timestamps : true , versionKey : false});

const expanseModel = mongoose.model("expanse" , expanseSchema);

module.exports = expanseModel;