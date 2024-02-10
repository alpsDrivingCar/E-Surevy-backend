const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


// Define the ValuePdfModel Schema
const valuePdfModelSchema = new Schema({
    value: { type: String, default: "" },
    isCheck: { type: Boolean, default: false },
    slug: { type: String, default: true },
    label: { type: String, default: "" },
    isEmpty: { type: Boolean, default: false },
    isHideCheckBox: { type: Boolean, default: false }
});

// Define the MainListPdfModel Schema
const mainListPdfModelSchema = new Schema({
    label: { type: String, required: false },
    type: { type: String, required: false , default: "" },
    singleValues: [valuePdfModelSchema],
    isBig: { type: Boolean, default: false }
});

// Define the Report Schema
const reportSchema = new Schema({
    reports: [mainListPdfModelSchema],
    supervisorId: { type: ObjectId, ref: 'supervisor' },
    surveyorId: { type: ObjectId, ref: 'surveyor' }
}, { timestamps: true }); // Enable timestamps here

// Create a model for Report
const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
