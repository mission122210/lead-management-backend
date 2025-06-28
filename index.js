const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors") // 👈 import cors

const app = express()
const PORT = 5000

connectDB()
app.use(express.json())
app.use(cors()) // 👈 enable CORS for all origins

// Routes
app.use("/api/leads", require("./routes/leadRoutes"))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
