const Lead = require("../models/Lead")
const cloudinary = require("../utils/cloudinary")


const uploadLeadImage = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
    if (!lead) return res.status(404).json({ message: "Lead not found" })

    const { image } = req.body
    if (!image) return res.status(400).json({ message: "No image provided" })

    // If image already exists, delete it from Cloudinary
    if (lead.imagePublicId) {
      await cloudinary.uploader.destroy(lead.imagePublicId)
    }

    // Upload new image
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: "leads",
    })

    lead.imageUrl = uploadRes.secure_url
    lead.imagePublicId = uploadRes.public_id
    await lead.save()

    res.json({
      message: "Image uploaded successfully",
      imageUrl: lead.imageUrl,
      imagePublicId: lead.imagePublicId,
    })
  } catch (error) {
    console.error("Error uploading lead image:", error)
    res.status(500).json({ message: "Error uploading image", error: error.message })
  }
}


const deleteLeadImage = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
    if (!lead) return res.status(404).json({ message: "Lead not found" })

    if (!lead.imagePublicId)
      return res.status(400).json({ message: "No image found for this lead" })

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(lead.imagePublicId)
    if (result.result !== "ok") {
      return res.status(500).json({ message: "Failed to delete image from Cloudinary" })
    }

    // Remove image info from DB
    lead.imageUrl = undefined
    lead.imagePublicId = undefined
    await lead.save()

    res.json({ message: "Image deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting image", error: error.message })
  }
}


// Add new lead with image upload
const addLead = async (req, res) => {
  try {
    const {
      clientNumber,
      myNumber,
      teamMember,
      status,
      remarks,
      image, // 👈 base64 string (optional)
    } = req.body

    let imageUrl = ""
    let imagePublicId = ""

    // Upload image if provided
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "leads", // optional: puts all images in a 'leads' folder on Cloudinary
      })

      imageUrl = uploadRes.secure_url
      imagePublicId = uploadRes.public_id
    }

    const newLead = new Lead({
      clientNumber,
      myNumber,
      teamMember,
      status,
      remarks,
      imageUrl,
      imagePublicId,
    })

    const savedLead = await newLead.save()
    res.status(201).json(savedLead)
  } catch (error) {
    console.error("Error in addLead:", error)
    res.status(500).json({
      message: "Error adding lead",
      error: error.message,
    })
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

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
    if (!lead) return res.status(404).json({ message: "Lead not found" })

    // If image exists, delete it from Cloudinary
    if (lead.imagePublicId) {
      const result = await cloudinary.uploader.destroy(lead.imagePublicId)
      if (result.result !== "ok") {
        return res.status(500).json({ message: "Failed to delete image from Cloudinary" })
      }
    }

    // Now delete the lead
    await lead.deleteOne()

    res.json({ message: "Lead and associated image deleted successfully" })
  } catch (err) {
    console.error("Error deleting lead:", err)
    res.status(500).json({ message: err.message || "Error deleting lead" })
  }
}


module.exports = { addLead, fetchLeads, updateLead, deleteLead, deleteLeadImage, uploadLeadImage }
