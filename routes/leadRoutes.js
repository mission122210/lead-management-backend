// --- routes/leadRoutes.js ---
const express = require("express")
const router = express.Router()
const { addLead, fetchLeads, updateLead, deleteLead, deleteLeadImage, uploadLeadImage } = require("../controllers/leadController")

router.post("/addLead", addLead)
router.get("/fetchLeads", fetchLeads)
router.put("/updateLead/:id", updateLead)
router.delete("/deleteLead/:id", deleteLead)
router.delete("/deleteLeadImage/:id", deleteLeadImage)
router.put("/uploadImage/:id", uploadLeadImage)

module.exports = router