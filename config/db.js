const mongoose = require("mongoose")

const MONGO_URI = "mongodb+srv://goku012:0121452goku@cluster0.53byfkj.mongodb.net/jutt" 
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection failed:", error.message)
    process.exit(1)
  }
}

module.exports = connectDB
