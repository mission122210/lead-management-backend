const mongoose = require("mongoose")

const leadSchema = new mongoose.Schema({
  clientNumber: { type: String, required: true },
  myNumber: { type: String, required: true },
  teamMember: { type: String, required: true },
  status: { type: String, required: true },
  remarks: { type: String },
}, { timestamps: true })

module.exports = mongoose.model("Lead", leadSchema)
