const Lead = require("../models/Lead")

// Add new lead
const addLead = async (req, res) => {
  try {
    const newLead = new Lead(req.body)
    const savedLead = await newLead.save()
    res.status(201).json(savedLead)
  } catch (error) {
    res.status(500).json({ message: "Error adding lead", error: error.message })
  }
}

// Fetch all leads
const fetchLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 })
    res.json(leads)
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads", error: error.message })
  }
}

const updateLead = async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) return res.status(404).json({ message: "Lead not found" })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message || "Error updating lead" })
  }
}

// ✅ Delete lead
const deleteLead = async (req, res) => {
  console.log("Working")
  try {
    const deleted = await Lead.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: "Lead not found" })
    res.json({ message: "Lead deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message || "Error deleting lead" })
  }
}

module.exports = { addLead, fetchLeads, updateLead, deleteLead }
