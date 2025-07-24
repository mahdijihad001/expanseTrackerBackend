const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    type : {type : String , default : "income"},
    icon: { type: String },
    source: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true, versionKey: false });


const IncomeModel = mongoose.model("income", IncomeSchema);

module.exports = IncomeModel;