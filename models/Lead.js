const mongoose = require("mongoose")

const leadSchema = new mongoose.Schema({
  clientNumber: { type: String, required: true },
  myNumber: { type: String, required: true },
  teamMember: { type: String, required: true },
  status: { type: String, required: true },
  remarks: { type: String },
  imageUrl: { type: String },        // 🌐 Cloudinary secure URL
  imagePublicId: { type: String },   // 🆔 Cloudinary public_id

  // ✅ New Reminder Field
  reminder: {
    datetime: { type: Date },           // Store in UTC; convert frontend time to UTC if needed
    timezone: { type: String },         // e.g., "EST", "PST", "UTC"
    reason: { type: String },
  }
}, { timestamps: true })

module.exports = mongoose.model("Lead", leadSchema)
