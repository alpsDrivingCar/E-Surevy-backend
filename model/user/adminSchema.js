const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    name: String,
    password:String,
    phone:String
},{ timestamps: true });


// Create a model based on that schema
const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin

