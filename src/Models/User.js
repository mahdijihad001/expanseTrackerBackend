const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    fullName : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    profileImage : {type : String , default : null},
} , {
    timestamps : true , 
    versionKey : false
});

// Hasing user password
userSchema.pre("save" ,async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10);
    next();
});

// Compaire User Password

userSchema.methods.compairePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword , this.password);
};


const userModel = mongoose.model("user" , userSchema);

module.exports = userModel