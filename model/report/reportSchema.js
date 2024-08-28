const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Define the GroupInfo Schema
const groupInfoSchema = new Schema({
    type: { type: String, required: true },
    id: { type: Number, required: true, unique: true }, // Required unique identifier
});

// Define the FieldModel Schema
const fieldModelSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // Required unique identifier
    type: { type: String, required: true },
    required: { type: Boolean, default: false },
    options: { type: [String], default: null }, // For dropdown fields
    initialValue: { type: Boolean, default: null }, // For checkbox fields
    dependsOn: { type: String, default: null }, // Slug of the field this field depends on
    visibleWhen: { type: Schema.Types.Mixed, default: null }, // Can be any value (boolean, string, etc.)
    selectedValues: { type: [String], default: null }, // For multiple selected values
    selectedValue: { type: String, default: null }, // For single selected value
    addButtonTitle: { type: String, default: null },
    pdfInputType: { type: String, default: null },
    groupInfo: { type: groupInfoSchema, default: null },
    // TextEditingController is ignored in the Node.js model
});

// Define the Report Schema
const reportSchema = new Schema({
    language: { type: String, required: true, default: "ar" }, // en, ar
    fields: [fieldModelSchema], // Incorporating the FieldModel structure
    supervisorId: { type: ObjectId, ref: 'supervisor' },
    surveyorId: { type: ObjectId, ref: 'surveyor' }
}, { timestamps: true }); // Enable timestamps here

// Create a model for Report
const Report = mongoose.model("NewReport", reportSchema);

module.exports = Report;
