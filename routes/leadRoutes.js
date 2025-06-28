// --- routes/leadRoutes.js ---
const express = require("express")
const router = express.Router()
const { addLead, fetchLeads, updateLead, deleteLead } = require("../controllers/leadController")

router.post("/addLead", addLead)
router.get("/fetchLeads", fetchLeads)
router.put("/updateLead/:id", updateLead) 
router.delete("/deleteLead/:id", deleteLead) 

module.exports = router