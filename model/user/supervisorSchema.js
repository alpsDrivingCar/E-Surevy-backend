const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const supervisorSchema = new Schema({
    password:String,
    phone:String,
    companyName:String,
    imageUrl: String
});


// Create a model based on that schema
const Admin = mongoose.model("supervisor", supervisorSchema);

module.exports = Admin

