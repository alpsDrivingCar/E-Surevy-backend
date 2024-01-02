const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const supervisorSchema = new Schema({
    password: String,
    phone: String,
    companyName: String,
    imageUrl: String,
    surveyors: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'surveyor'  // This should match the name of the surveyor model
    }]
});


// Create a model based on that schema
const Admin = mongoose.model("supervisor", supervisorSchema);

module.exports = Admin

