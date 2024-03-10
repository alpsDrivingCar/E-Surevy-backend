const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const surveyorSchema = new Schema({
    surveyorName: String,
    password:String,
    phone:String,
    supervisorId: { type: ObjectId, ref: 'supervisor' },
    companyName:String,
    imageUrl: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
}, { timestamps: true });

// Create a model based on that schema
const Surveyor = mongoose.model("surveyor", surveyorSchema);

module.exports = Surveyor;
