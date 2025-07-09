const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // 👈 Make sure this is at the top

const citiesRoute = require("./routes/cities");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (Put this here)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/cities", citiesRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
